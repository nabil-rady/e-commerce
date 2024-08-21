<?php

namespace App\Entities;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;

#[Entity]
#[Table('categories')]
class Category {
    #[Id]
    #[Column(), GeneratedValue]
    private int $id;

    #[Column()]
    private string $name;

    public function getId(): int{
        return $this->id;
    }    

    public function getName(): string{
        return $this->name;
    }

    public function toArray(): array {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
        ];
    }
}
