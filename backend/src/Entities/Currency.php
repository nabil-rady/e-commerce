<?php

namespace App\Entities;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;

#[Entity]
#[Table('currencies')]
class Currency
{
    #[Id]
    #[Column()]
    protected string $label;

    #[Column()]
    private string $symbol;

    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'symbol' => $this->symbol,
        ];
    }
}
