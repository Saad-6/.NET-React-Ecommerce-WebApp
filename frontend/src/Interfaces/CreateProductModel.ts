export default interface CreateProductModel {
    Price: number | null; // Make Price nullable to match C# int?
    Stock?: number | null; // Make Stock nullable to match C# int?
    Name: string;
    Description: string;
    Category: string;
    Image: string;
    GimmickPrice?: number | null; // Make GimmickPrice nullable to match C# int?
}