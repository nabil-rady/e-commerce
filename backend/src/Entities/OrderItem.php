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
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;

#[Entity]
#[Table(name: "order_items")]
class OrderItem
{
    #[Id]
    #[Column(), GeneratedValue]
    private $id;

    #[Column()]
    private float $quantity;

    #[OneToMany(targetEntity: OrderItemAttribute::class, mappedBy: "orderItem")]
    private Collection $attributes;

    #[ManyToOne(targetEntity: Order::class, inversedBy: "items")]
    #[JoinColumn(name: "order_id", referencedColumnName: "id")]
    private $order;

    #[ManyToOne(targetEntity: Product::class)]
    #[JoinColumn(name: "product_id", referencedColumnName: "id")]
    private $product;

    public function __construct()
    {
        $this->attributes = new ArrayCollection();
    }

    public function setProduct(Product $product)
    {
        $this->product = $product;
    }

    public function setQuantity(int $quantity)
    {
        $this->quantity = $quantity;
    }

    public function setOrder(Order $order)
    {
        $this->order = $order;
    }

    public function getAttributes(): Collection
    {
        return $this->attributes;
    }

    public function addAttribute(OrderItemAttribute $attribute)
    {
        return $this->attributes[] = $attribute;
    }

    public function toArray(): array
    {
        return [
            'product' => $this->product->toArray(),
            'quantity' => $this->quantity,
            'selectedAttributes' => $this->attributes->map(function (OrderItemAttribute $orderItemAttribute) {
                return $orderItemAttribute->toArray();
            })->toArray(),
        ];
    }
}
