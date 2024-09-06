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
class Product
{
    #[Id]
    #[Column()]
    private string $id;

    #[Column()]
    private string $name;

    #[Column()]
    private bool $inStock;

    #[Column()]
    private string $brand;

    #[Column()]
    private string $description;

    #[OneToMany(targetEntity: Price::class, mappedBy: 'product')]
    private Collection $prices;

    #[ManyToOne(targetEntity: Category::class, fetch: 'EAGER')]
    #[JoinColumn(name: 'category_id', referencedColumnName: 'id')]
    private ?Category $category = null;

    #[OneToMany(targetEntity: AttributeSet::class, mappedBy: 'product')]
    private Collection $attributeSets;

    #[OneToMany(targetEntity: ProductImage::class, mappedBy: 'product')]
    private Collection $gallery;

    public function __construct()
    {
        $this->attributeSets = new ArrayCollection();
        $this->prices = new ArrayCollection();
        $this->gallery = new ArrayCollection();
    }

    public function getAttributeSet(): Collection
    {
        return $this->attributeSets;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'brand' => $this->brand,
            'description' => $this->description,
            'category' => $this->category->toArray(),
            'prices' => $this->prices->map(function (Price $price) {
                return $price->toArray();
            }),
            'gallery' => $this->gallery->map(function (ProductImage $productImage) {
                return $productImage->getLink();
            }),
        ];
    }
}
