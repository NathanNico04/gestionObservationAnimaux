<?php

namespace App\State;

use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\ObservationRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Fournit uniquement les observations de l'utilisateur connecté
 */
class SecureObservationsProvider implements ProviderInterface
{
    public function __construct(
        private ObservationRepository $observationRepository,
        private TokenStorageInterface $tokenStorage
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        if (!$operation instanceof CollectionOperationInterface) {
            return [];
        }

        $token = $this->tokenStorage->getToken();
        $user = $token?->getUser();

        if (!is_object($user)) {
            return [];
        }

        return $this->observationRepository->getUserObservations($user);
    }
}
