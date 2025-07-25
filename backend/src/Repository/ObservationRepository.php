<?php

namespace App\Repository;

use App\Entity\Observation;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Observation>
 */
class ObservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Observation::class);
    }

    /**
     * Retourne toutes les observations appartenant à l’utilisateur donné.
     *
     * @param User $user
     * @return Observation[]
     */
    public function getUserObservations(User $user): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.user = :user')
            ->setParameter('user', $user)
            ->orderBy('o.id', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
