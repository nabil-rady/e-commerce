<?php

namespace App\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\OneToMany;

#[Entity]
#[Table('attribute_sets')]
class AttributeSet {
    #[Id]
    #[Column(), GeneratedValue]
    private int $id;

    #[Column('attribute_set_id')]
    private string $attributeSetId;

    #[Column()]
    private string $name;

    #[Column()]
    private string $type;

    #[Column('product_id')]
    private string $productId;

    #[OneToMany(targetEntity: Attribute::class, mappedBy: 'attributeSet')]
    private Collection $items;

    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function toArray(): array {
        return [
            'id' => $this->attributeSetId,
            'type' => $this->type,
            'name' => $this->name,
            'items' => $this->items->map(function($item){
                return $item->toArray();
            })->toArray(),
        ];
    }
}
