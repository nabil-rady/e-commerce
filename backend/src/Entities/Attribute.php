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
#[Table('attributes')]
class Attribute {
    #[Id]
    #[Column(), GeneratedValue]
    private int $id;

    #[Column('attribute_id')]
    private string $attributeId;

    #[Column()]
    private string $displayValue;

    #[Column()]
    private string $value;

    #[ManyToOne(targetEntity: AttributeSet::class, inversedBy: 'items')]
    #[JoinColumn(name: 'attribute_set_id', referencedColumnName: 'id')]
    private ?AttributeSet $attributeSet = null;

    public function toArray(): array {
        return [
            'id' => $this->attributeId,
            'displayValue' => $this->displayValue,
            'value' => $this->value,
        ];
    }
}
