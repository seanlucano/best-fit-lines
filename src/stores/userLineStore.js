import { writable} from 'svelte/store';


const userLineStore = writable({
    x1: 2, 
    y1: 8, 
    x2: 14, 
    y2: 8,
    m: 0,
    b: 7,
    
    slope: function() { 
        this.m = (this.y2 - this.y1) / (this.x2 - this.x1); return this.m; 
    },

    intercept: function() {
        this.b = this.y1 - this.m * this.x1; return this.b; 
    },
});

export default userLineStore;
