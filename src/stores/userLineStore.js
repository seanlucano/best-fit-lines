import { writable} from 'svelte/store';


const userLineStore = writable({
    x1: 1, 
    y1: 8, 
    x2: 18, 
    y2: 8,
    m: 1,
    b: 1,
    
    slope: function() { 
        this.m = (this.y2 - this.y1) / (this.x2 - this.x1); return this.m; 
    },

    intercept: function() {
        this.b = this.y1 - this.m * this.x1; return this.b; 
    },
});

export default userLineStore;
