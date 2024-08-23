<?php

namespace App\Entities;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\OneToOne;

#[Entity]
#[Table('products')]
class Product {
    #[Id]
    #[Column()]
    private string $id;

    #[Column()]
    private string $name;

    #[Column()]
    private bool $inStock;

    #[Column()]
    private float $price;

    #[Column()]
    private string $brand;

    #[Column()]
    private string $description;

    #[ManyToOne(targetEntity: Category::class, fetch: 'EAGER')]
    #[JoinColumn(name: 'category_id', referencedColumnName: 'id')]
    private ?Category $category = null;

    #[OneToMany(targetEntity: AttributeSet::class, mappedBy: 'product', fetch: 'EAGER')]
    private Collection $attributeSets;

    #[OneToMany(targetEntity: ProductImage::class, mappedBy: 'product', fetch: 'EAGER')]
    private Collection $gallery;

    public function __construct() {
        $this->attributeSets = new ArrayCollection();
        $this->gallery = new ArrayCollection();
    }

    public function getAttributeSet(): Collection {
        return $this->attributeSets;
    }

    public function getCategory(): Category{
        return $this->category;
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'price' => $this->price,
            'brand' => $this->brand,
            'description' => $this->description,
            'category' => $this->category->toArray(),
            'attributes' => $this->attributeSets->map(function(AttributeSet $attributeSet) {
                return $attributeSet->toArray();
            }),
            'gallery' => $this->gallery->map(function(ProductImage $productImage){
                return $productImage->getLink();
            }),
        ];
    }
}
