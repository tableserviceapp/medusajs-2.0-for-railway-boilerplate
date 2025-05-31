async function duplicateProduct() {
  const ADMIN_TOKEN = process.env.MEDUSA_ADMIN_TOKEN || 'sk_94fa4c84b9d776ccc83e98f073cb3c97b01af57df98a3eb16734b0dc9900905c';
  const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'https://admin.cakeboxgifts.co.uk';
  
  try {
    // First, find the mixed-brownie-box product
    console.log('Fetching mixed-brownie-box product...');
    const searchResponse = await fetch(
      `${BACKEND_URL}/admin/products?q=mixed-brownie-box&expand=options,variants,images,tags,type,collection`,
      {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`Failed to fetch products: ${searchResponse.status}`);
    }

    const { products } = await searchResponse.json();
    const originalProduct = products.find(p => p.handle === 'mixed-brownie-box');
    
    if (!originalProduct) {
      throw new Error('Mixed brownie box product not found');
    }

    console.log(`Found product: ${originalProduct.title} (${originalProduct.id})`);

    // Duplicate the product 10 times
    for (let i = 1; i <= 10; i++) {
      console.log(`Creating duplicate ${i}/10...`);
      
      // Prepare the product data for duplication
      const newProductData = {
        title: `${originalProduct.title} - Copy ${i}`,
        handle: `${originalProduct.handle}-copy-${i}`,
        description: originalProduct.description,
        subtitle: originalProduct.subtitle,
        is_giftcard: originalProduct.is_giftcard,
        discountable: originalProduct.discountable,
        weight: originalProduct.weight,
        length: originalProduct.length,
        height: originalProduct.height,
        width: originalProduct.width,
        hs_code: originalProduct.hs_code,
        origin_country: originalProduct.origin_country,
        mid_code: originalProduct.mid_code,
        material: originalProduct.material,
        metadata: originalProduct.metadata,
        status: 'draft', // Create as draft so you can modify before publishing
      };

      // Create the product
      const createResponse = await fetch(`${BACKEND_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData)
      });

      if (!createResponse.ok) {
        const error = await createResponse.text();
        console.error(`Failed to create product ${i}: ${error}`);
        continue;
      }

      const { product: newProduct } = await createResponse.json();
      console.log(`Created product: ${newProduct.title} (${newProduct.id})`);

      // Add options if the original product has them
      if (originalProduct.options && originalProduct.options.length > 0) {
        for (const option of originalProduct.options) {
          await fetch(`${BACKEND_URL}/admin/products/${newProduct.id}/options`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ADMIN_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: option.title,
              values: option.values.map(v => v.value)
            })
          });
        }
      }

      // Add variants
      if (originalProduct.variants && originalProduct.variants.length > 0) {
        for (const variant of originalProduct.variants) {
          const variantData = {
            title: variant.title,
            sku: variant.sku ? `${variant.sku}-copy-${i}` : null,
            ean: variant.ean,
            upc: variant.upc,
            barcode: variant.barcode,
            hs_code: variant.hs_code,
            weight: variant.weight,
            length: variant.length,
            height: variant.height,
            width: variant.width,
            origin_country: variant.origin_country,
            mid_code: variant.mid_code,
            material: variant.material,
            metadata: variant.metadata,
            prices: variant.prices?.map(price => ({
              amount: price.amount,
              currency_code: price.currency_code,
              region_id: price.region_id
            })) || [],
            options: variant.options?.map(opt => ({
              option_id: newProduct.options.find(o => o.title === opt.option.title)?.id,
              value: opt.value
            })) || []
          };

          await fetch(`${BACKEND_URL}/admin/products/${newProduct.id}/variants`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ADMIN_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(variantData)
          });
        }
      }

      // Add to collection if original is in one
      if (originalProduct.collection_id) {
        await fetch(`${BACKEND_URL}/admin/collections/${originalProduct.collection_id}/products/batch`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_ids: [newProduct.id]
          })
        });
      }

      console.log(`Successfully duplicated product ${i}/10`);
    }

    console.log('All duplications complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

duplicateProduct(); 