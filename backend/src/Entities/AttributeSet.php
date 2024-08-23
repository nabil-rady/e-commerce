<?php

namespace App\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\ManyToOne;

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

    #[ManyToOne(targetEntity: Product::class, inversedBy: 'attributeSets', fetch: 'EAGER')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private ?Product $product = null;
    
    #[OneToMany(targetEntity: Attribute::class, mappedBy: 'attributeSet')]
    private Collection $items;

    public function __construct() {
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
