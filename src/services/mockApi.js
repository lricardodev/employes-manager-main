const STORAGE_KEY = 'employees_manager_db';

const initialData = {
  employees: [
    {
      id: "Bg73",
      empName: "Luis Ricardo",
      empFirstName: "cornejo",
      empLastName: "correo",
      empSystemAccess: true
    },
    {
      id: "AVqM",
      empName: "victor",
      empFirstName: "hernandez",
      empLastName: "Sandoval",
      empSystemAccess: false
    },
    {
      id: "VkUA",
      empName: "marco",
      empFirstName: "Garcia ",
      empLastName: "perez",
      empSystemAccess: true
    },
    {
      id: "ORqe",
      empName: "Jennyfer Lizbeth",
      empFirstName: "cornejo",
      empLastName: "correo",
      empSystemAccess: true
    },
    {
      id: "Xy9K",
      empName: "Carlos Alberto",
      empFirstName: "Rodriguez",
      empLastName: "Martinez",
      empSystemAccess: true
    },
    {
      id: "Pm2N",
      empName: "Ana Sofia",
      empFirstName: "Lopez",
      empLastName: "Gonzalez",
      empSystemAccess: true
    },
    {
      id: "Qr5T",
      empName: "Roberto",
      empFirstName: "Sanchez",
      empLastName: "Fernandez",
      empSystemAccess: false
    },
    {
      id: "Wv8H",
      empName: "Maria Elena",
      empFirstName: "Torres",
      empLastName: "Ramirez",
      empSystemAccess: true
    },
    {
      id: "Zb3F",
      empName: "Jose Antonio",
      empFirstName: "Morales",
      empLastName: "Diaz",
      empSystemAccess: true
    },
    {
      id: "Cd7J",
      empName: "Patricia",
      empFirstName: "Vargas",
      empLastName: "Castro",
      empSystemAccess: false
    },
    {
      id: "Ef1L",
      empName: "Fernando",
      empFirstName: "Jimenez",
      empLastName: "Ruiz",
      empSystemAccess: true
    },
    {
      id: "Gh4M",
      empName: "Laura",
      empFirstName: "Mendoza",
      empLastName: "Ortega",
      empSystemAccess: true
    }
  ],
  users: [
    {
      id: "Bg73",
      usrEmail: "luis@gmail.com",
      usrName: "Luis Usuario",
      usrPassword: "dsvfsv",
      usrAreas: ["1", "3"]
    },
    {
      id: "AVqM",
      usrEmail: "",
      usrName: "",
      usrPassword: "",
      usrAreas: []
    },
    {
      id: "VkUA",
      usrEmail: "correo2@gmail.com",
      usrName: "usuario2",
      usrPassword: "jtyjujuk",
      usrAreas: []
    },
    {
      id: "ORqe",
      usrEmail: "jenny@gmail.com",
      usrName: "JennyUser",
      usrPassword: "rthytjhyj",
      usrAreas: ["3"]
    },
    {
      id: "Xy9K",
      usrEmail: "carlos.rodriguez@empresa.com",
      usrName: "carlos.rodriguez",
      usrPassword: "pass1234",
      usrAreas: ["1", "2", "4"]
    },
    {
      id: "Pm2N",
      usrEmail: "ana.lopez@empresa.com",
      usrName: "ana.lopez",
      usrPassword: "securePass",
      usrAreas: ["2", "3"]
    },
    {
      id: "Qr5T",
      usrEmail: "",
      usrName: "",
      usrPassword: "",
      usrAreas: []
    },
    {
      id: "Wv8H",
      usrEmail: "maria.torres@empresa.com",
      usrName: "maria.torres",
      usrPassword: "mypass2024",
      usrAreas: ["1", "3", "4", "5"]
    },
    {
      id: "Zb3F",
      usrEmail: "jose.morales@empresa.com",
      usrName: "jose.morales",
      usrPassword: "admin123",
      usrAreas: ["1", "2"]
    },
    {
      id: "Cd7J",
      usrEmail: "",
      usrName: "",
      usrPassword: "",
      usrAreas: []
    },
    {
      id: "Ef1L",
      usrEmail: "fernando.jimenez@empresa.com",
      usrName: "fernando.jimenez",
      usrPassword: "fpass2024",
      usrAreas: ["4", "5"]
    },
    {
      id: "Gh4M",
      usrEmail: "laura.mendoza@empresa.com",
      usrName: "laura.mendoza",
      usrPassword: "lpass123",
      usrAreas: ["2", "3", "5"]
    }
  ],
  areas: [
    { id: "1", joaName: "Recursos Humanos", joaAbbreviation: "RRHH" },
    { id: "2", joaName: "Tecnología", joaAbbreviation: "IT" },
    { id: "3", joaName: "Ventas", joaAbbreviation: "VTS" },
    { id: "4", joaName: "Marketing", joaAbbreviation: "MKT" },
    { id: "5", joaName: "Finanzas", joaAbbreviation: "FIN" },
    { id: "6", joaName: "Operaciones", joaAbbreviation: "OPS" },
    { id: "7", joaName: "Atención al Cliente", joaAbbreviation: "ATC" },
    { id: "8", joaName: "Logística", joaAbbreviation: "LOG" }
  ]
};

const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

const getData = () => {
  initializeData();
  const data = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(data);
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // GET /resource
  get: async (url) => {
    await delay();
    const data = getData();
    const resource = url.split('/')[1]; // employees, users, areas
    
    if (url.includes('/')) {
      const parts = url.split('/');
      if (parts.length === 3) {
        // GET /resource/:id
        const id = parts[2];
        const item = data[resource]?.find(item => item.id === id);
        if (!item) {
          throw new Error(`Resource with id ${id} not found`);
        }
        return { data: item };
      }
    }
    
    // GET /resource (all)
    return { data: data[resource] || [] };
  },

  // POST /resource
  post: async (url, body) => {
    await delay();
    const data = getData();
    const resource = url.split('/')[1];
    
    if (!data[resource]) {
      data[resource] = [];
    }
    
    const newItem = { ...body };
    if (!newItem.id) {
      newItem.id = Date.now().toString();
    }
    
    data[resource].push(newItem);
    saveData(data);
    
    return { data: newItem };
  },

  // PUT /resource/:id
  put: async (url, body) => {
    await delay();
    const data = getData();
    const parts = url.split('/');
    const resource = parts[1];
    const id = parts[2];
    
    if (resource === 'areas' && Array.isArray(body)) {
      const userIndex = data.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        data.users[userIndex].usrAreas = body.map(area => area.id || area);
        saveData(data);
        return { data: data.users[userIndex] };
      } else {
        throw new Error(`User with id ${id} not found`);
      }
    }
    
    if (!data[resource]) {
      throw new Error(`Resource ${resource} not found`);
    }
    
    const index = data[resource].findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Resource with id ${id} not found`);
    }
    
    data[resource][index] = { ...data[resource][index], ...body };
    saveData(data);
    return { data: data[resource][index] };
  },

  // DELETE /resource/:id
  delete: async (url) => {
    await delay();
    const data = getData();
    const parts = url.split('/');
    const resource = parts[1];
    const id = parts[2];
    
    if (!data[resource]) {
      throw new Error(`Resource ${resource} not found`);
    }
    
    const index = data[resource].findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Resource with id ${id} not found`);
    }
    
    data[resource].splice(index, 1);
    saveData(data);
    
    return { data: {} };
  }
};

export const resetMockData = () => {
  localStorage.removeItem(STORAGE_KEY);
  initializeData();
};
initializeData();