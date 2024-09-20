import { create } from 'zustand'

export const useProductsStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct) {
            return {
                success: false,
                message: "Please fill in all fields",
            };
        }

        // Await the fetch call here
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        // Await the response's json parsing
        const data = await res.json();

        // Update the products in the state
        set((state) => ({ products: [...state.products, data.data] }));

        return {
            success: true,
            message: "Product created successfully",
        };
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products')
        const data = await res.json();
        set({
            products: data.data
        })
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data=await res.json()
        if (!data.success) return { success: false, message: data.message }
        set(state => ({
            products: state.products.filter(product => product._id !== pid)
        }));
        return { success: true, message: data.message }
    },
    updateProduct:async(pid,updatedProduct)=>{
        const res=await fetch(`/api/products/${pid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(updatedProduct),
        })
        const data=await res.json();
        if(!data.success) return {success:false,message:data.message};
        set((state)=>({
            products:state.products.map((product)=>(product._id===pid ?data.data:product))
        }));
        return {success:true,message:data.message}
    }
}));
