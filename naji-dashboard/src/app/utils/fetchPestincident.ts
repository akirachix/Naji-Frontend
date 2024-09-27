export const fetchPestincident = async () => {
    try {
      const response = await fetch('/api/pestincident', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pestincident.' + response.text());
      }
      const data = await response.json();
      console.log('Fetched pest-incident data:', data);
      return data;
  
  
    } catch (error) {
      console.error('Error fetching pest-incident:', error);
      throw error;
    }
   };
  
 