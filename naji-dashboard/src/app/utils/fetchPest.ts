export const fetchPest = async () => {
    try {
      const response = await fetch('/api/pest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
       if (!response.ok) {
        throw new Error('Failed to fetch pest.'+ response.text());
      }
       const data = await response.json();
      console.log('Fetched pest data:', data);
      return data;
    
    } catch (error) {
      console.error('Error fetching pest:', error);
      throw error;
    }
  };
 