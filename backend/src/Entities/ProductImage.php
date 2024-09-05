<?php

namespace App\Entities;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\ManyToOne;

#[Entity]
#[Table('product_images')]
class ProductImage
{
    #[Id]
    #[Column(), GeneratedValue]
    private int $id;

    #[Column()]
    private string $link;

    #[ManyToOne(targetEntity: Product::class, inversedBy: 'gallery')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private ?Product $product = null;

    public function getLink(): string
    {
        return $this->link;
    }
}
