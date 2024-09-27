export interface PestIncident { 
incident_id: number;
detection_date: string;
confidence_score: number;
affected_area_percentage: number;
    

}
export interface Pest {
pest_id: number;
pest_description: string;
pest_name: string;
    
}
export interface FarmerDetails{
    farmer_name?:string,
    farmer_phone_number?: string,
    farmer_county?:string
}
