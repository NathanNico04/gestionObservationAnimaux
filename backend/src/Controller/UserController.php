<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;

#[AsController]
class UserController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(Request $request): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], 401);
        }

        // Si ce n'est pas ton entité User, retourne juste username et roles
        if (!$user instanceof User) {
            return $this->json([
                'id' => null,
                'username' => $user->getUserIdentifier(),
                'prenom' => '',
                'nom' => '',
                'roles' => $user->getRoles(),
            ]);
        }

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'prenom' => $user->getPrenom(),
            'nom' => $user->getNom(),
            'roles' => $user->getRoles(),
        ]);
    }
}
