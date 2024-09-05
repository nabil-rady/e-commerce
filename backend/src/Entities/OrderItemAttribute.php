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
#[Table(name: "order_item_attributes")]
class OrderItemAttribute
{
    #[Id()]
    #[Column(), GeneratedValue]
    private $id;

    #[ManyToOne(targetEntity: OrderItem::class, inversedBy: "attributes", fetch: "EAGER")]
    #[JoinColumn(name: "order_item_id", referencedColumnName: "id")]
    private $orderItem;

    #[ManyToOne(targetEntity: Attribute::class, fetch: "EAGER")]
    #[JoinColumn(name: "attribute_id", referencedColumnName: "id")]
    private $attribute;

    public function setOrderItem(OrderItem $orderItem)
    {
        $this->orderItem = $orderItem;
    }

    public function setAttribute(Attribute $attribute)
    {
        $this->attribute = $attribute;
    }

    public function toArray(): array
    {
        return $this->attribute->toArray();
    }
}
