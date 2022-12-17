import axios from 'axios';
import cheerio from 'cheerio';
import { Sequelize } from 'sequelize';

interface VkProduct {
  postURL: string;
  description: string;
  authorName: string;
  authorUrl: string;
}

export class VkScraper {
  readonly startUrl = 'https://vk.com/public119778653';

  async scrape() {
    return await this.crawlProducts(this.startUrl);
  }

  async crawlProducts(url: string) {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const productsInfo: VkProduct[] = [];
    const descriptions: string[] = [];

    // @ts-ignore
    $('.pi_text').each(function (i, elm) {
      // @ts-ignore
      descriptions.push($(this).text());
    });

    const authors: string[] = [];
    // @ts-ignore
    $('.user').each(function (i, elm) {
      // @ts-ignore
      authors.push(`https://vk.com${$(this).attr('href')}`);
    });

    const authorsNames: string[] = [];
    // @ts-ignore
    $('.user').each(function (i, elm) {
      // @ts-ignore
      authorsNames.push($(this).text());
    });

    const postsLinks: string[] = [];
    // @ts-ignore
    $('.wi_date').each(function (i, elm) {
      // @ts-ignore
      postsLinks.push(`https://vk.com${$(this).attr('href')}`);
    });

    for (let i = 0; i < descriptions.length; i++) {
      productsInfo.push({
        authorName: authorsNames[i],
        authorUrl: authors[i],
        description: descriptions[i],
        postURL: postsLinks[i],
      });
    }
    // for (const post of posts) {
    //   const description = $(post).get;
    // }

    console.log('TES:T', productsInfo);

    return productsInfo;
  }
}

async function main() {
  const scraper = new VkScraper();

  const VkProducts: VkProduct[] = await scraper.scrape();
  console.log('TEST: vk products', VkProducts);

  const seq = new Sequelize('postgres', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'database-1.cjqkxpdyr9kc.us-east-2.rds.amazonaws.com',
    port: 5432,
  });

  // testing the connection
  const [results] = await seq.query('SELECT 1 + 1 as result;');

  if (!results) {
    throw new Error('db error');
  }

  const [type_ids] = await seq.query(`SELECT * from trpo.product_type;`);

  console.log('TEST: type ids', type_ids);

  for (const product of VkProducts) {
    const [createdBeforeProducts] = await seq.query(
      `SELECT * from trpo.products where description like '%${product.postURL}%';`,
    );

    if (createdBeforeProducts.length === 0) {
      const descriptionText = `Post from vk.com: ${product.description}. Author name: ${product.authorName}. You can contact author by this link: ${product.authorUrl}. Link to the original post: ${product.postURL}`;
      await seq.query(
        `INSERT INTO trpo.products (id, name, description, "manufactureDate", price, image, type_id, condition, "minAge", "maxAge",
				address_id, user_id, created_at, updated_at)
	VALUES (DEFAULT, :name, :description, :manufactureDate, :price, :image, :type_id, :condition, :minAge, :maxAge, :address_id, :user_id, DEFAULT,
	DEFAULT) RETURNING *;`,
        {
          replacements: {
            name: 'Post from vk.com',
            address_id: 'test',
            condition: 'Б/У',
            image: '',
            manufactureDate: new Date(),
            price: 0,
            // @ts-ignore
            type_id: type_ids[0].id,
            user_id: 0,
            minAge: 3,
            maxAge: 10,
            description: descriptionText,
          },
        },
      );
    }
  }
}

main();
