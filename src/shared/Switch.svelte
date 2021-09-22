
<script>
    export let checked = false;
    export let disabled = false;
    export let color = 'primary';
</script>


<label class="switch">
    <input type="checkbox" disabled={disabled} bind:checked={checked}>
    <span class="slider {color}" class:disabled={disabled}></span>
</label>



<style>
    .switch {
        top: 4px;
        position: relative;
        display: inline-block;
        width: 2.2em;
        height: .75em;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 34px;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 1.2em;
        width: 1.2em;
        top: -3px;
        left: -2px;
        border-radius: 50%;
        background-color: white;
        -webkit-transition: .4s;
        box-shadow: 2px 2px 8px grey;
        transition: .4s;
    }

    input:checked + .primary{
        background-color: var(--primary);
    }

    input:checked + .secondary {
        background-color: var(--secondary);
    }

    input:checked + .accent {
        background-color: var(--accent);
    }

    input:checked + .alert {
        background-color: var(--alert);
    }


    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(1.2em);
        -ms-transform: translateX(1.2em);
        transform: translateX(1.2em);
    }

    
    input:disabled + .disabled {
        background-color: #f0f3f5;
        pointer: none;
        
    }

    input:disabled + .disabled:before {
        background-color: #e3e6e8;
        box-shadow: 0px 0px 0px white;
        cursor: not-allowed;
    }


</style>