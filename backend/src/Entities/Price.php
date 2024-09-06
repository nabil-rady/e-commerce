<?php

namespace App\Entities;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\DBAL\Types\Types;

#[Entity]
#[Table('prices')]
class Price
{
    #[Id]
    #[Column()]
    protected string $product_id;

    #[Id]
    #[Column()]
    protected string $currency_label;

    #[ManyToOne(targetEntity: Product::class, inversedBy: 'prices', fetch: 'EAGER')]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;

    #[ManyToOne(targetEntity: Currency::class, fetch: 'EAGER')]
    #[JoinColumn(name: 'currency_label', referencedColumnName: 'label')]
    private Currency $currency;

    #[Column(type: Types::DECIMAL)]
    private string $amount;

    public function toArray(): array
    {
        return [
            'amount' => $this->amount,
            'currency' => $this->currency->toArray(),
        ];
    }
}
