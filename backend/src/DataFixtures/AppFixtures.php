<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Animal;
use App\Entity\Observation;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // Création des utilisateurs
        $usersData = [
            ['max', 'Maximilien', 'Goujon', 'secret', ['ROLE_ADMIN']],
            ['nathan', 'Nathan', 'Nicolessi', 'secret', ['ROLE_USER']],
            ['wail', 'Wail', 'Demnati', 'secret', ['ROLE_USER']],
            ['inouk', 'Inouk', 'Buigne', 'secret', ['ROLE_USER']],
        ];

        $users = [];

        foreach ($usersData as [$username, $prenom, $nom, $password, $roles]) {
            $user = new User();
            $user->setUsername($username);
            $user->setPrenom($prenom);
            $user->setNom($nom);
            $user->setRoles($roles);

            // Hash du mot de passe
            $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);

            $manager->persist($user);
            $users[] = $user;
        }

        // Création des animaux
        $nomsAnimaux = [
            ['Renard roux', 'Vulpes vulpes', 'Chordata', 'Mammalia', 'Carnivora', 'Caniformia', 'Canidae', 'Vulpes', 'LC'],
            ['Loup gris', 'Canis lupus', 'Chordata', 'Mammalia', 'Carnivora', 'Caniformia', 'Canidae', 'Canis', 'LC'],
            ['Ours brun', 'Ursus arctos', 'Chordata', 'Mammalia', 'Carnivora', 'Caniformia', 'Ursidae', 'Ursus', 'LC'],
            ['Lynx boréal', 'Lynx lynx', 'Chordata', 'Mammalia', 'Carnivora', 'Feliformia', 'Felidae', 'Lynx', 'LC'],
            ['Blaireau européen', 'Meles meles', 'Chordata', 'Mammalia', 'Carnivora', 'Caniformia', 'Mustelidae', 'Meles', 'LC'],
            ['Cerf élaphe', 'Cervus elaphus', 'Chordata', 'Mammalia', 'Artiodactyla', 'Ruminantia', 'Cervidae', 'Cervus', 'LC'],
            ['Chevreuil européen', 'Capreolus capreolus', 'Chordata', 'Mammalia', 'Artiodactyla', 'Ruminantia', 'Cervidae', 'Capreolus', 'LC'],
            ['Sanglier', 'Sus scrofa', 'Chordata', 'Mammalia', 'Artiodactyla', 'Suina', 'Suidae', 'Sus', 'LC'],
            ['Hérisson commun', 'Erinaceus europaeus', 'Chordata', 'Mammalia', 'Eulipotyphla', 'Erinaceomorpha', 'Erinaceidae', 'Erinaceus', 'LC'],
            ['Chat forestier', 'Felis silvestris', 'Chordata', 'Mammalia', 'Carnivora', 'Feliformia', 'Felidae', 'Felis', 'LC'],
        ];

        $animaux = [];

        foreach ($nomsAnimaux as [$nom, $savant, $embr, $classe, $ordre, $sousOrdre, $famille, $genre, $iucn]) {
            $animal = new Animal();
            $animal->setNomCommun($nom);
            $animal->setNomSavant($savant);
            $animal->setEmbranchement($embr);
            $animal->setClasse($classe);
            $animal->setOrdre($ordre);
            $animal->setSousOrdre($sousOrdre);
            $animal->setFamille($famille);
            $animal->setGenre($genre);
            $animal->setStatutIUCN($iucn);
            $animal->setDescription($faker->paragraph(3));

            $manager->persist($animal);
            $animaux[] = $animal;
        }

        // Création de 50 observations liées aux utilisateurs
        for ($i = 0; $i < 50; $i++) {
            $observation = new Observation();
            $observation->setDate($faker->dateTimeBetween('-1 year', 'now'));
            $observation->setLatitude($faker->latitude);
            $observation->setLongitude($faker->longitude);
            $observation->setDescription($faker->sentence(10));

            $animal = $faker->randomElement(array_merge(
                array_slice($animaux, 0, 3),
                $faker->randomElements($animaux, rand(1, 2))
            ));
            $user = $faker->randomElement($users); // choisir un utilisateur aléatoire

            $observation->setAnimal($animal);
            $observation->setUser($user); // lier l'utilisateur !

            $manager->persist($observation);
        }

        $manager->flush();
    }
}
