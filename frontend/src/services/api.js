import { initialProperties, initialInquiries } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper for local mock storage
const getStoredProperties = () => {
  const data = localStorage.getItem('homelink_mock_properties');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  localStorage.setItem('homelink_mock_properties', JSON.stringify(initialProperties));
  return initialProperties;
};

const setStoredProperties = (props) => {
  localStorage.setItem('homelink_mock_properties', JSON.stringify(props));
};

const getStoredInquiries = () => {
  const data = localStorage.getItem('homelink_mock_inquiries');
  if (data) {
    try { return JSON.parse(data); } catch (e) {}
  }
  localStorage.setItem('homelink_mock_inquiries', JSON.stringify(initialInquiries));
  return initialInquiries;
};

const setStoredInquiries = (inqs) => {
  localStorage.setItem('homelink_mock_inquiries', JSON.stringify(inqs));
};

// Generic fetch wrapper with timeout and JWT header
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('homelink_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for fast fallback

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'API request failed');
    }

    if (res.status === 204) return null;
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export const api = {
  // Authentication
  login: async (email, password) => {
    try {
      return await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      console.warn('Backend unavailable, using mock login:', err.message);
      // Mock login handling
      if (email === 'owner@homelink.com') {
        return {
          token: 'mock-jwt-owner-token',
          id: 1,
          name: 'Rajesh Sharma (Direct Owner)',
          email: 'owner@homelink.com',
          role: 'ROLE_OWNER',
          phone: '+91 98765 43210',
        };
      }
      return {
        token: 'mock-jwt-tenant-token',
        id: 3,
        name: 'Aarav Mehta (Tenant)',
        email: email || 'tenant@homelink.com',
        role: 'ROLE_TENANT',
        phone: '+91 98888 77777',
      };
    }
  },

  register: async (userData) => {
    try {
      return await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (err) {
      console.warn('Backend unavailable, using mock register:', err.message);
      return {
        token: 'mock-jwt-registered-token',
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'ROLE_TENANT',
        phone: userData.phone || '+91 99999 00000',
      };
    }
  },

  getCurrentUser: async () => {
    return await request('/auth/me');
  },

  // Properties
  getProperties: async (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.city) query.append('city', filters.city);
    if (filters.minPrice) query.append('minPrice', filters.minPrice);
    if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) query.append('bedrooms', filters.bedrooms);
    if (filters.propertyType) query.append('propertyType', filters.propertyType);
    if (filters.furnishing) query.append('furnishing', filters.furnishing);
    if (filters.keyword) query.append('keyword', filters.keyword);

    try {
      return await request(`/properties?${query.toString()}`);
    } catch (err) {
      console.warn('Backend unavailable, fetching mock properties:', err.message);
      let props = getStoredProperties();
      if (filters.city) {
        props = props.filter((p) => p.city.toLowerCase().includes(filters.city.toLowerCase()));
      }
      if (filters.maxPrice) {
        props = props.filter((p) => p.rentPrice <= Number(filters.maxPrice));
      }
      if (filters.minPrice) {
        props = props.filter((p) => p.rentPrice >= Number(filters.minPrice));
      }
      if (filters.bedrooms) {
        props = props.filter((p) => p.bedrooms === Number(filters.bedrooms));
      }
      if (filters.propertyType) {
        props = props.filter((p) => p.propertyType === filters.propertyType);
      }
      if (filters.furnishing) {
        props = props.filter((p) => p.furnishing === filters.furnishing);
      }
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        props = props.filter(
          (p) =>
            p.title.toLowerCase().includes(kw) ||
            p.address.toLowerCase().includes(kw) ||
            p.description.toLowerCase().includes(kw)
        );
      }
      return props;
    }
  },

  getPropertyById: async (id) => {
    try {
      return await request(`/properties/${id}`);
    } catch (err) {
      const props = getStoredProperties();
      const found = props.find((p) => p.id === Number(id));
      if (!found) throw new Error('Property not found');
      return found;
    }
  },

  createProperty: async (propertyData) => {
    try {
      return await request('/properties', {
        method: 'POST',
        body: JSON.stringify(propertyData),
      });
    } catch (err) {
      console.warn('Backend unavailable, saving mock property locally');
      const props = getStoredProperties();
      const newProperty = {
        ...propertyData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isAvailable: true,
        isFavorite: false,
        owner: {
          id: 1,
          name: 'Rajesh Sharma (Direct Owner)',
          email: 'owner@homelink.com',
          role: 'ROLE_OWNER',
          phone: '+91 98765 43210',
        },
      };
      setStoredProperties([newProperty, ...props]);
      return newProperty;
    }
  },

  deleteProperty: async (id) => {
    try {
      return await request(`/properties/${id}`, { method: 'DELETE' });
    } catch (err) {
      const props = getStoredProperties().filter((p) => p.id !== Number(id));
      setStoredProperties(props);
      return { success: true };
    }
  },

  getMyListings: async () => {
    try {
      return await request('/properties/my-listings');
    } catch (err) {
      const props = getStoredProperties();
      return props.filter((p) => p.owner && p.owner.email === 'owner@homelink.com');
    }
  },

  // Inquiries
  createInquiry: async (inquiryData) => {
    try {
      return await request('/inquiries', {
        method: 'POST',
        body: JSON.stringify(inquiryData),
      });
    } catch (err) {
      const inqs = getStoredInquiries();
      const props = getStoredProperties();
      const targetProp = props.find((p) => p.id === Number(inquiryData.propertyId));

      const newInquiry = {
        id: Date.now(),
        propertyId: inquiryData.propertyId,
        propertyTitle: targetProp ? targetProp.title : 'Rental Home',
        propertyAddress: targetProp ? targetProp.address : '',
        propertyCity: targetProp ? targetProp.city : '',
        rentPrice: targetProp ? targetProp.rentPrice : 0,
        propertyImage: targetProp && targetProp.images ? targetProp.images[0] : '',
        message: inquiryData.message,
        phone: inquiryData.phone,
        preferredVisitDate: inquiryData.preferredVisitDate,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        tenant: {
          id: 3,
          name: 'Aarav Mehta (Tenant)',
          email: 'tenant@homelink.com',
          phone: inquiryData.phone || '+91 98888 77777',
        },
        owner: targetProp ? targetProp.owner : null,
      };

      setStoredInquiries([newInquiry, ...inqs]);
      return newInquiry;
    }
  },

  getMyInquiries: async () => {
    try {
      return await request('/inquiries/my-inquiries');
    } catch (err) {
      return getStoredInquiries();
    }
  },

  getOwnerInquiries: async () => {
    try {
      return await request('/inquiries/owner-inquiries');
    } catch (err) {
      return getStoredInquiries();
    }
  },

  updateInquiryStatus: async (inquiryId, status) => {
    try {
      return await request(`/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      const inqs = getStoredInquiries();
      const updated = inqs.map((inq) =>
        inq.id === Number(inquiryId) ? { ...inq, status } : inq
      );
      setStoredInquiries(updated);
      return updated.find((inq) => inq.id === Number(inquiryId));
    }
  },

  // Favorites
  toggleFavorite: async (propertyId) => {
    try {
      return await request(`/favorites/${propertyId}/toggle`, { method: 'POST' });
    } catch (err) {
      const props = getStoredProperties();
      let isFav = false;
      const updated = props.map((p) => {
        if (p.id === Number(propertyId)) {
          isFav = !p.isFavorite;
          return { ...p, isFavorite: isFav };
        }
        return p;
      });
      setStoredProperties(updated);
      return { isFavorite: isFav };
    }
  },

  getFavorites: async () => {
    try {
      return await request('/favorites');
    } catch (err) {
      const props = getStoredProperties();
      return props.filter((p) => p.isFavorite);
    }
  },

  // Stats
  getStats: async () => {
    try {
      return await request('/stats');
    } catch (err) {
      const props = getStoredProperties();
      const inqs = getStoredInquiries();
      const cities = new Set(props.map((p) => p.city)).size;
      const totalRent = props.reduce((acc, p) => acc + (p.rentPrice || 0), 0);
      return {
        totalProperties: props.length,
        totalActiveListings: props.filter((p) => p.isAvailable).length,
        totalCities: cities || 5,
        totalInquiries: inqs.length,
        estimatedBrokerageSaved: totalRent,
      };
    }
  },
};
