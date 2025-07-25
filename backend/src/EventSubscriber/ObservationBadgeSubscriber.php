<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Observation;
use App\Entity\Badge;
use App\Repository\BadgeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ObservationBadgeSubscriber implements EventSubscriberInterface
{
    // 🎯 Ta configuration des paliers ici :
    private array $badgeRules = [
        1 => ['Débutant', 'Félicitations pour ta première observation !'],
        10 => ['Explorateur', '10 observations réalisées, bravo !'],
        50 => ['Protecteur', '50 observations réalisées, merci pour ton engagement !'],
        100 => ['Héros de la biodiversité', '100 observations, tu es un expert engagé !']
    ];

    public function __construct(
        private EntityManagerInterface $entityManager,
        private BadgeRepository $badgeRepository,
    ) {}

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onPostPersist', EventPriorities::POST_WRITE],
        ];
    }

    public function onPostPersist(ViewEvent $event): void
    {
        $observation = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$observation instanceof Observation || $method !== 'POST') {
            return;
        }

        $user = $observation->getUser();
        if (!$user) {
            return;
        }

        $observations = $user->getObservations();
        $count = count($observations);

        // 📈 On regarde si un badge correspond à ce nombre d'observations
        if (array_key_exists($count, $this->badgeRules)) {
            [$badgeName, $description] = $this->badgeRules[$count];
            $this->awardBadge($user, $badgeName, $description);
            $this->entityManager->flush();
        }
    }

    private function awardBadge($user, string $badgeName, string $description): void
    {
        $badge = $this->badgeRepository->findOneBy(['nom' => $badgeName]);

        if (!$badge) {
            $badge = new Badge();
            $badge->setNom($badgeName);
            $badge->setDescription($description);

            $this->entityManager->persist($badge);
        }

        if (!$user->getBadges()->contains($badge)) {
            $user->addBadge($badge);
        }
    }
}
