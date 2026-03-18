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


export async function getAllProducts (req, res)
{
    try
    {
        const [products] = await pool.query(
            "SELECT * FROM products"
        )

        res.json(products);
    }
    catch(err)
    {
        res.status(400).json({
            message: "Failed to Retrieve Products"
        })
    }
}

export async function searchProduct (req, res){
    try
    {
        const {product_name} = req.body

        const [products] = await pool.query(
            "SELECT * FROM products WHERE product_name LIKE ?",
            [`%${product_name}%`]
        )

      

        res.json(products);
    }
    catch(err)
    {
        res.status(400).json({
            message: "Failed to Search Products"
        })
    }

}

export async function editProduct(req, res) {
    try {
        const {
            product_name,
            product_quantity,
            product_price,
            model_name,
            category,
            notes,
            product_id
        } = req.body;

        if (!product_id) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        const [result] = await pool.query(
            `UPDATE products 
             SET product_name = ?, product_quantity = ?, product_price = ?, 
                 model_name = ?, category = ?, notes = ?
             WHERE product_id = ?`,
            [product_name, product_quantity, product_price, model_name, category, notes, product_id]
        );

        // check if product exists
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product Edited Successfully",
            affectedRows: result.affectedRows
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to Edit Product",
            error: err.message
        });
    }
}

export async function deleteProduct (req, res){
    try
    {
        const {product_id} = req.body;
        const [deleteProduct] = await pool.query(
            "DELETE FROM products "+
            "WHERE product_id = ?",
            [product_id]
        )
        res.status(200).json({
            message: "Product Deleted Successfully"
        })
    } catch(err)
    {
        res.status(400).json({
            message: "Failed to Delete Product"
        })
    }
}    