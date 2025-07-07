import {create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success: false, message: "Please in all details"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}))
        return{success: true, message: "Product created successfully"}
    },

    //Fetch all product
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json()
        set({products: data.data})
    },

    //Delete a product
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        })
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message};

        //Update the UI immediately without needing a refresh
        set((state) => ({products: state.products.filter((product) => product._id !== pid) }))
        return {success:true, message: data.message}
    },

    //Update a Product
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message:data.message};
        set((state) => ({
            products: state.product.map((product) => (product._id === pid ? data.data: product))
        }))
    }
}))