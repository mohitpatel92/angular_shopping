export interface SignUp{
    name:string,
    email:string,
    password:string
}

export interface login{
    email :string,
    password :string
}

export interface product{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string
    id:number
    quantity : undefined | number
    productId :undefined | number
}

export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string
    id:number | undefined
    quantity : undefined | number
    userId:number
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number
    id:number | undefined
}