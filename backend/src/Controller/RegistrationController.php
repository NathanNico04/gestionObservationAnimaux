<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class RegistrationController extends AbstractController
{
    #[Route('/api/registration', name: 'api_register', methods: ['POST'])]
    public function __invoke(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (
            empty($data['username']) ||
            empty($data['password']) ||
            empty($data['prenom']) ||   // <-- corrigé ici
            empty($data['nom']) ||       // <-- corrigé ici
            empty($data['role'])
        ) {
            return new JsonResponse(['error' => 'Missing required fields'], 400);
        }

        $user = new User();
        $user->setUsername($data['username']);
        $user->setPrenom($data['prenom']); // <-- corrigé ici
        $user->setNom($data['nom']);       // <-- corrigé ici
        $user->setRoles([$data['role']]);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['password'])
        );

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'User created successfully',
            'username' => $user->getUsername(),
            'id' => $user->getId()
        ], 201);
    }
}
