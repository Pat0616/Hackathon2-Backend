import pool from "../db.js";


export async function AddProduct (req, res)
{
    try{

    
        const {product_name, product_quantity, product_price, model_name, category, notes} = req.body


        //existing na product + quantity
        //no existing product + row

        const [compareName] = await pool.query(
            "SELECT product_name "+
            "FROM products "+
            "WHERE product_name = ?",
            [product_name]
        )

        if(compareName.length > 0)
        {
            const [addAmount] = await pool.query(
                "UPDATE products "+
                "SET product_quantity = product_quantity + ? "+
                "WHERE product_name = ?",
                [product_quantity, product_name]
            )

            res.status(201).json({
                message: "Amount Added Successfully",
                product: {product_name: product_name, product_quantity: product_quantity}
            })
        }


        else{
            const [addProduct] = await pool.query(
                "INSERT INTO products (product_name, product_quantity, product_price, model_name, category, notes) VALUEs (?, ?, ?, ?, ?, ?)",
                [product_name, product_quantity, product_price, model_name, category, notes]
            )

            res.status(201).json({
                message: "Added Products Successfully",
                product: {id: addProduct.id, product: addProduct.product_name}
            })
        }
    }
    catch(err)
    {
        res.status(400).json({
            message: "Adding Product Failed"
        })
    }
}

