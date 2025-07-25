<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Repository\ObservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\State\SecureObservationsProvider;

#[ORM\Entity(repositoryClass: ObservationRepository::class)]
#[ApiResource(
  operations: [
      new GetCollection(
          security: "is_granted('ROLE_USER')",
          provider: SecureObservationsProvider::class
      ),
      new Get(
          security: "is_granted('ROLE_USER') and object.getUser() == user",
          securityMessage: "Vous n’avez pas le droit de voir cette observation."
      ),
      new Post(
          security: "is_granted('ROLE_USER')",
          securityPostDenormalize: "object.setUser(user)",
          // on enregistre automatiquement l'utilisateur courant
      ),
      new Patch(
          security: "is_granted('ROLE_USER') and object.getUser() == user",
          securityMessage: "Vous ne pouvez modifier que vos propres observations."
      ),
      new Delete(
          security: "is_granted('ROLE_USER') and object.getUser() == user",
          securityMessage: "Vous ne pouvez supprimer que vos propres observations."
      ),
  ]
)]
class Observation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?float $latitude = null;

    #[ORM\Column]
    private ?float $longitude = null;

    #[ORM\ManyToOne(inversedBy: 'observations')]
    private ?Animal $animal = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'observations')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getAnimal(): ?Animal
    {
        return $this->animal;
    }

    public function setAnimal(?Animal $animal): static
    {
        $this->animal = $animal;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
