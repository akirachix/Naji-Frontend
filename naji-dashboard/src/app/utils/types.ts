export interface PestIncident {
    incident_id: number;
    detection_date: number;
    confidence_score: number;
    affected_area_percentage: number;

}
export interface Pest {
    pest_id: number;
    pest_description: String;
    pest_name: String;
    
}
