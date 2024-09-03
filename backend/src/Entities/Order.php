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
#[Table('orders')]
class Order {
    #[Id]
    #[Column]
    #[GeneratedValue]
    protected int $id;

    #[OneToMany(targetEntity: OrderItem::class, mappedBy: "order", fetch: "EAGER")]
    private Collection $items;

    public function __construct() {
        $this->items = new ArrayCollection();
    }

    public function addItem(OrderItem $orderItem) {
        return $this->items[] = $orderItem;
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'items' => $this->items->map(function (OrderItem $items){
                return $items->toArray();
            })->toArray()
        ];
    }
}
