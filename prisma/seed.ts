import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: 'Tênis Syntax Runner Pro',
    slug: 'tenis-syntax-runner-pro',
    description: 'Tênis de corrida leve com amortecimento responsivo e cabedal respirável.',
    price: 399.90,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ['Vermelho', 'Preto', 'Branco'],
    stock: 45,
    active: true,
  },
  {
    name: 'Camiseta Oversized Code Heavy',
    slug: 'camiseta-oversized-code-heavy',
    description: 'Camiseta streetwear em algodão egípcio de alta gramatura com modelagem ampla.',
    price: 149.90,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Off-White', 'Cinza Chumbo'],
    stock: 80,
    active: true,
  },
  {
    name: 'Moletom Hoodie Kernel Panic',
    slug: 'moletom-hoodie-kernel-panic',
    description: 'Moletom canguru flanelado com capuz duplo e acabamento premium.',
    price: 289.90,
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Azul Marinho', 'Verde Militar'],
    stock: 35,
    active: true,
  },
  {
    name: 'Jaqueta Corta-Vento Deploy',
    slug: 'jaqueta-corta-vento-deploy',
    description: 'Jaqueta impermeável corta-vento com detalhes refletivos e bolsos com zíper.',
    price: 349.90,
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Cinza', 'Azul Royal'],
    stock: 25,
    active: true,
  },
  {
    name: 'Calça Cargo Fullstack',
    slug: 'calca-cargo-fullstack',
    description: 'Calça cargo em sarja com elastano, seis bolsos funcionais e ajuste na barra.',
    price: 259.90,
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'],
    sizes: [38, 40, 42, 44, 46],
    colors: ['Preto', 'Cáqui', 'Verde Oliva'],
    stock: 50,
    active: true,
  },
  {
    name: 'Tênis Casual Urban Byte',
    slug: 'tenis-casual-urban-byte',
    description: 'Tênis casual minimalista em couro sintético para uso diário.',
    price: 319.90,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800'],
    sizes: [37, 38, 39, 40, 41, 42],
    colors: ['Branco', 'Preto', 'Bege'],
    stock: 60,
    active: true,
  },
  {
    name: 'Bermuda Moletom Comfort Tech',
    slug: 'bermuda-moletom-comfort-tech',
    description: 'Bermuda de moletom leve com cordão ajustável e bolso traseiro.',
    price: 129.90,
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Cinza Mescla', 'Preto', 'Marinho'],
    stock: 70,
    active: true,
  },
  {
    name: 'Boné Dad Hat Syntax Minimal',
    slug: 'bone-dad-hat-syntax-minimal',
    description: 'Boné aba curva em sarja 100% algodão com bordado minimalista e fecho strapback.',
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'],
    sizes: ['Único'],
    colors: ['Preto', 'Bege', 'Verde Escuro'],
    stock: 100,
    active: true,
  },
  {
    name: 'Jaqueta Puffer Cloud Native',
    slug: 'jaqueta-puffer-cloud-native',
    description: 'Jaqueta acolchoada térmica leve e resistente à água para dias frios.',
    price: 459.90,
    images: ['https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800'],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Off-White'],
    stock: 20,
    active: true,
  },
  {
    name: 'Mochila Impermeável DevPack 25L',
    slug: 'mochila-impermeavel-devpack-25l',
    description: 'Mochila urbana impermeável com compartimento acolchoado para notebook de até 16 polegadas.',
    price: 279.90,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
    sizes: ['25L'],
    colors: ['Preto', 'Cinza Escuro'],
    stock: 40,
    active: true,
  },
];

async function main() {
  console.log('Iniciando seed de produtos...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`${products.length} produtos inseridos/atualizados com sucesso!`);
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

