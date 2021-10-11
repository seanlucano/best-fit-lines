
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity$2 = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function self$1(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }
    class HtmlTag {
        constructor() {
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity$2, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity$2, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.6' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /*
    Adapted from https://github.com/mattdesl
    Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
    */
    function backInOut(t) {
        const s = 1.70158 * 1.525;
        if ((t *= 2) < 1)
            return 0.5 * (t * t * ((s + 1) * t - s));
        return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
    }
    function backIn(t) {
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    }
    function backOut(t) {
        const s = 1.70158;
        return --t * t * ((s + 1) * t + s) + 1;
    }
    function bounceOut(t) {
        const a = 4.0 / 11.0;
        const b = 8.0 / 11.0;
        const c = 9.0 / 10.0;
        const ca = 4356.0 / 361.0;
        const cb = 35442.0 / 1805.0;
        const cc = 16061.0 / 1805.0;
        const t2 = t * t;
        return t < a
            ? 7.5625 * t2
            : t < b
                ? 9.075 * t2 - 9.9 * t + 3.4
                : t < c
                    ? ca * t2 - cb * t + cc
                    : 10.8 * t * t - 20.52 * t + 10.72;
    }
    function bounceInOut(t) {
        return t < 0.5
            ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
            : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
    }
    function bounceIn(t) {
        return 1.0 - bounceOut(1.0 - t);
    }
    function circInOut(t) {
        if ((t *= 2) < 1)
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }
    function circIn(t) {
        return 1.0 - Math.sqrt(1.0 - t * t);
    }
    function circOut(t) {
        return Math.sqrt(1 - --t * t);
    }
    function cubicInOut(t) {
        return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
    function cubicIn(t) {
        return t * t * t;
    }
    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }
    function elasticInOut(t) {
        return t < 0.5
            ? 0.5 *
                Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
                Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
            : 0.5 *
                Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
                Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
                1.0;
    }
    function elasticIn(t) {
        return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
    }
    function elasticOut(t) {
        return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
    }
    function expoInOut(t) {
        return t === 0.0 || t === 1.0
            ? t
            : t < 0.5
                ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
                : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
    }
    function expoIn(t) {
        return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
    }
    function expoOut(t) {
        return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    }
    function quadInOut(t) {
        t /= 0.5;
        if (t < 1)
            return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
    }
    function quadIn(t) {
        return t * t;
    }
    function quadOut(t) {
        return -t * (t - 2.0);
    }
    function quartInOut(t) {
        return t < 0.5
            ? +8.0 * Math.pow(t, 4.0)
            : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
    }
    function quartIn(t) {
        return Math.pow(t, 4.0);
    }
    function quartOut(t) {
        return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
    }
    function quintInOut(t) {
        if ((t *= 2) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    }
    function quintIn(t) {
        return t * t * t * t * t;
    }
    function quintOut(t) {
        return --t * t * t * t * t + 1;
    }
    function sineInOut(t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    }
    function sineIn(t) {
        const v = Math.cos(t * Math.PI * 0.5);
        if (Math.abs(v) < 1e-14)
            return 1;
        else
            return 1 - v;
    }
    function sineOut(t) {
        return Math.sin((t * Math.PI) / 2);
    }

    var easings = /*#__PURE__*/Object.freeze({
        __proto__: null,
        backIn: backIn,
        backInOut: backInOut,
        backOut: backOut,
        bounceIn: bounceIn,
        bounceInOut: bounceInOut,
        bounceOut: bounceOut,
        circIn: circIn,
        circInOut: circInOut,
        circOut: circOut,
        cubicIn: cubicIn,
        cubicInOut: cubicInOut,
        cubicOut: cubicOut,
        elasticIn: elasticIn,
        elasticInOut: elasticInOut,
        elasticOut: elasticOut,
        expoIn: expoIn,
        expoInOut: expoInOut,
        expoOut: expoOut,
        quadIn: quadIn,
        quadInOut: quadInOut,
        quadOut: quadOut,
        quartIn: quartIn,
        quartInOut: quartInOut,
        quartOut: quartOut,
        quintIn: quintIn,
        quintInOut: quintInOut,
        quintOut: quintOut,
        sineIn: sineIn,
        sineInOut: sineInOut,
        sineOut: sineOut,
        linear: identity$2
    });

    function fade(node, { delay = 0, duration = 400, easing = identity$2 } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }
    function slide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }
    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
    }

    /* src/shared/Button.svelte generated by Svelte v3.42.6 */

    const file$i = "src/shared/Button.svelte";

    function create_fragment$i(ctx) {
    	let button;
    	let button_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			button.disabled = /*disabled*/ ctx[1];
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*color*/ ctx[0]) + " svelte-1w3q01o"));
    			attr_dev(button, "type", /*type*/ ctx[2]);
    			add_location(button, file$i, 8, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", self$1(/*click_handler*/ ctx[5]), false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*disabled*/ 2) {
    				prop_dev(button, "disabled", /*disabled*/ ctx[1]);
    			}

    			if (!current || dirty & /*color*/ 1 && button_class_value !== (button_class_value = "" + (null_to_empty(/*color*/ ctx[0]) + " svelte-1w3q01o"))) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (!current || dirty & /*type*/ 4) {
    				attr_dev(button, "type", /*type*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { color = 'primary' } = $$props;
    	let { disabled = false } = $$props;
    	let { type = '' } = $$props;
    	const writable_props = ['color', 'disabled', 'type'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ('type' in $$props) $$invalidate(2, type = $$props.type);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ color, disabled, type });

    	$$self.$inject_state = $$props => {
    		if ('color' in $$props) $$invalidate(0, color = $$props.color);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ('type' in $$props) $$invalidate(2, type = $$props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, disabled, type, $$scope, slots, click_handler];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { color: 0, disabled: 1, type: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const counter = writable(0);

    const sequence = [
        {	
            title: 'Welcome to best fit lines!',
            prompt: `<p>Imagine each circle you see represents a single sales transaction.</p>
        <p>Just for fun, let's say all each transactions is for some (x) number of donuts for some (y) amount of US Dollars.</p>`,	
            cta: `<p><strong>What best describes the dollars to donuts relationship?</p>`,
            quiz: {
                questions: [`Positive`, `Negative `],
                correct: 0,
                feedback: `It's positive! As the number of donuts increases, so does transaction cost.`
            },	
            showPoints: true,
            
        },
        {	
            title: 'Imagine a line',
            prompt:`<p>We know that these two variables have a positive relationship.  But what if we would like to be more specific?</p>
        <p>Imagine you are on a very strict dollars to donuts budget, and you wanted to be able to <strong>predict</strong> the cost of a new transaction given any number of donuts purchased.</p>
        <p>That relationship could be expressed in the form of a <strong>line</stong>.</p>`,	
             cta: `<p><strong>Using the circle handles at the end points of the line, try to place a line that would best express the dollars to donuts relationship.</strong></p><p>Click next when you are happy with your line</p>`,
             showPoints: true,
             showUserLine: true
        },
        {	
            title: 'Good line...best line',
            prompt:`<p>Nice job!  This seems like a very reasonable line!</p>  <p>But is it the... <strong>best possible line</strong>?</p>    
        <p>What if you knew that a line existed that would give you the best possible linear relationship between dollars and donuts?</p>`,
             cta: `<p><strong>Use the "Best Fit Line" switch in the upper right to reveal this mysterious line!<p></strong></p>`,
            showPoints: true,
            showUserLineControls: true,
            showUserLine: true,
            showRegressionLineControls: true	
        },
        
        {	title: 'What makes a good "fit"',
            prompt:`<p>So we know that there is such a thing as a <strong>best fit</strong> line, but what makes this line so...best?  <p><strong>How do we know this new line is any better than the line you drew?</strong></p>
        <p>Here's one way to start thinking about what makes a line's fit good or bad: <strong>you need to be able to measure the distance between each data point and the line.</strong></p>`,	
            cta: `<p><strong>Click any point to reveal the distance between that point and the lines.</strong></p> <p>Ok, sort of interesting...but so what?</p>`,
            showPoints: true,
            showUserLine: true,
            showRegressionLine: true,
            showUserLineControls: true,
            showRegressionLineControls: true,
            showHighlighting: true,
            showSingleResidual: true
            
        },
        {	title: 'Residuals',
            prompt:` <p>Each of these points tell us about an <strong>observed</strong> transaction.  Our line, on the other hand, is attempting to predict future dollar vlues for any number of donuts purchased.</p>
        <p>Sometimes the line makes a prediction about a transaction cost that we already know.</p>
        <p>The distance between the <strong>observed</strong> cost and the line's <strong>predicted</strong> cost is the <strong>residual</strong> (or error) value for the line at each point.</p>	
        `,
            cta: `<p><strong>Click on any point to see an explanation of the the residual cost for each transaction.</strong></p><p>You can view the explanation for either line, or for both at the same time<p>`,
            showPoints: true,
            showUserLineControls: true,
            showRegressionLineControls: true,
            showUserLine: true,
            showRegressionLine: true,
            showHighlighting: true,
            showSingleResidual: true,
            showPredictTooltip: true
        },
        {	title: 'Minimizing residuals',
            prompt: `<p>Any self-respecting <strong>best fit</strong> line would try to reduce the length of all of its residuals (or errors) as much as possible. So let's try and minimize residuals for your line.</p>`,
             cta: `<strong><p>Try moving your line around to minimize the lenghts of all residuals.</p></strong><p>You can still click any point to see the value of its residual.  Turn all residuals on and off using the "Residuals" switch above the chart.</p>`,
             showPoints: true,
             showUserLineControls: true,
             showUserLine: true,
             showUserResiduals: true,
             showSingleResidual: true,
             showHighlighting: true,
             showResidualControls: true,
        },
        
        {	title:"The 'least squares' method",
            prompt:`<p>Let's try and be a bit more scientific about this. If we want to truly find the <strong>best fit</strong> line, we would need to find a line that has the lowest possible <strong>sum of all residuals</strong>.  <p>However, since some residuals are negative and some are positive, we can <strong>square</strong> each one before adding all together.</p>
        <p>The table you're now seeing has shows the squared residual for each point, as well as a the total <strong>sum of squared residuals (SSR)</strong> for each line.`,	
             cta: `<p><strong>Click on any point, or any value in the table, to see which go together.</strong></p><p>The vlaues you are seeing displayed are rounded for readability, but don't worry!  'Under the hood' we're calculating the exact values.`,
             showPoints: true,
             showUserLineControls: true,
             showUserLine: true,
             showUserResiduals: true,
             showSingleResidual: true,
             showHighlighting: true,
             showRegressionLineControls: true,
             showResidualControls: true,
             showResidualsTable: true
            
        },

        {	title: 'Comparing SSRs',
            prompt:`<p> So, let's come back to our original question...which line is <strong>best</strong></p> <p>Based on what we've learned so far, the best fitting line would also be the line that has the <strong>least sum of squared residuals</strong>.
        <p>This is why the best fit line is also called the <strong>least squares line</strong></p>`,	
             cta: `<p><strong>What is the lowest SSR you can get for your line?</strong></p> 
         <p>If the only way to get the lowest possible SSR is to match the SSR of the best fit line, then we know that your line is now truly the <strong>best fit</strong> or <strong>least squares</strong> line!</p>`,
             showPoints: true,
             showUserLineControls: true,
             showRegressionLineControls: true,
             showUserLine: true,
             showSingleResidual: true,
             showHighlighting: true,
             showResidualControls: true,
             showUserResiduals: true,
             showResidualsTable: true
            
        }
    ];

    /* src/components/Prompt.svelte generated by Svelte v3.42.6 */
    const file$h = "src/components/Prompt.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[12] = i;
    	return child_ctx;
    }

    // (51:3) {#if sequence[$counter].quiz}
    function create_if_block$7(ctx) {
    	let form;
    	let t0;
    	let div0;
    	let t1;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = sequence[/*$counter*/ ctx[3]].quiz.questions;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	let if_block0 = /*showSubmit*/ ctx[0] && create_if_block_2$2(ctx);
    	let if_block1 = /*showFeedback*/ ctx[1] && create_if_block_1$5(ctx);

    	const block = {
    		c: function create() {
    			form = element("form");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t1 = space();
    			div1 = element("div");
    			if (if_block1) if_block1.c();
    			attr_dev(div0, "class", "submit svelte-3hlzph");
    			add_location(div0, file$h, 58, 5, 1375);
    			attr_dev(div1, "class", "feedback svelte-3hlzph");
    			add_location(div1, file$h, 63, 5, 1507);
    			add_location(form, file$h, 51, 4, 1128);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(form, null);
    			}

    			append_dev(form, t0);
    			append_dev(form, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(form, t1);
    			append_dev(form, div1);
    			if (if_block1) if_block1.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*onSubmit*/ ctx[4]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sequence, $counter, userChoice*/ 12) {
    				each_value = sequence[/*$counter*/ ctx[3]].quiz.questions;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(form, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (/*showSubmit*/ ctx[0]) {
    				if (if_block0) {
    					if (dirty & /*showSubmit*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*showFeedback*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$5(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			destroy_each(each_blocks, detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(51:3) {#if sequence[$counter].quiz}",
    		ctx
    	});

    	return block;
    }

    // (53:5) {#each sequence[$counter].quiz.questions as question, i}
    function create_each_block$5(ctx) {
    	let label;
    	let input;
    	let t0;
    	let t1_value = /*question*/ ctx[10] + "";
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(input, "name", "quiz");
    			attr_dev(input, "type", "radio");
    			input.__value = /*i*/ ctx[12];
    			input.value = input.__value;
    			attr_dev(input, "class", "svelte-3hlzph");
    			/*$$binding_groups*/ ctx[6][0].push(input);
    			add_location(input, file$h, 54, 7, 1255);
    			attr_dev(label, "class", "svelte-3hlzph");
    			add_location(label, file$h, 53, 6, 1239);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*userChoice*/ ctx[2];
    			append_dev(label, t0);
    			append_dev(label, t1);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*userChoice*/ 4) {
    				input.checked = input.__value === /*userChoice*/ ctx[2];
    			}

    			if (dirty & /*$counter*/ 8 && t1_value !== (t1_value = /*question*/ ctx[10] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[6][0].splice(/*$$binding_groups*/ ctx[6][0].indexOf(input), 1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(53:5) {#each sequence[$counter].quiz.questions as question, i}",
    		ctx
    	});

    	return block;
    }

    // (60:6) {#if showSubmit}
    function create_if_block_2$2(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				type: "submit",
    				color: "white",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(60:6) {#if showSubmit}",
    		ctx
    	});

    	return block;
    }

    // (61:7) <Button type='submit' color='white'>
    function create_default_slot$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Submit");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(61:7) <Button type='submit' color='white'>",
    		ctx
    	});

    	return block;
    }

    // (65:6) {#if showFeedback}
    function create_if_block_1$5(ctx) {
    	let html_tag;
    	let raw_value = sequence[/*$counter*/ ctx[3]].quiz.feedback + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$counter*/ 8 && raw_value !== (raw_value = sequence[/*$counter*/ ctx[3]].quiz.feedback + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(65:6) {#if showFeedback}",
    		ctx
    	});

    	return block;
    }

    // (38:0) {#key $counter}
    function create_key_block(ctx) {
    	let div0;
    	let h2;
    	let t0_value = sequence[/*$counter*/ ctx[3]].title + "";
    	let t0;
    	let div0_intro;
    	let t1;
    	let div1;
    	let raw0_value = sequence[/*$counter*/ ctx[3]].prompt + "";
    	let div1_intro;
    	let t2;
    	let div3;
    	let span;
    	let t4;
    	let html_tag;
    	let raw1_value = sequence[/*$counter*/ ctx[3]].cta + "";
    	let t5;
    	let div2;
    	let div3_intro;
    	let current;
    	let if_block = sequence[/*$counter*/ ctx[3]].quiz && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = space();
    			div3 = element("div");
    			span = element("span");
    			span.textContent = "ads_click";
    			t4 = space();
    			html_tag = new HtmlTag();
    			t5 = space();
    			div2 = element("div");
    			if (if_block) if_block.c();
    			add_location(h2, file$h, 39, 2, 840);
    			attr_dev(div0, "id", "title");
    			attr_dev(div0, "class", "svelte-3hlzph");
    			add_location(div0, file$h, 38, 1, 813);
    			attr_dev(div1, "id", "text");
    			attr_dev(div1, "class", "svelte-3hlzph");
    			add_location(div1, file$h, 41, 1, 885);
    			attr_dev(span, "class", "material-icons-round svelte-3hlzph");
    			add_location(span, file$h, 45, 2, 980);
    			html_tag.a = t5;
    			attr_dev(div2, "id", "quiz");
    			attr_dev(div2, "class", "svelte-3hlzph");
    			add_location(div2, file$h, 49, 2, 1075);
    			attr_dev(div3, "id", "cta");
    			attr_dev(div3, "class", "svelte-3hlzph");
    			add_location(div3, file$h, 44, 1, 955);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			div1.innerHTML = raw0_value;
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, span);
    			append_dev(div3, t4);
    			html_tag.m(raw1_value, div3);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			if (if_block) if_block.m(div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*$counter*/ 8) && t0_value !== (t0_value = sequence[/*$counter*/ ctx[3]].title + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*$counter*/ 8) && raw0_value !== (raw0_value = sequence[/*$counter*/ ctx[3]].prompt + "")) div1.innerHTML = raw0_value;			if ((!current || dirty & /*$counter*/ 8) && raw1_value !== (raw1_value = sequence[/*$counter*/ ctx[3]].cta + "")) html_tag.p(raw1_value);

    			if (sequence[/*$counter*/ ctx[3]].quiz) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$counter*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div2, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			if (!div0_intro) {
    				add_render_callback(() => {
    					div0_intro = create_in_transition(div0, fade, {});
    					div0_intro.start();
    				});
    			}

    			if (!div1_intro) {
    				add_render_callback(() => {
    					div1_intro = create_in_transition(div1, fade, {});
    					div1_intro.start();
    				});
    			}

    			transition_in(if_block);

    			if (!div3_intro) {
    				add_render_callback(() => {
    					div3_intro = create_in_transition(div3, fade, {});
    					div3_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(38:0) {#key $counter}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let link;
    	let t;
    	let previous_key = /*$counter*/ ctx[3];
    	let key_block_anchor;
    	let current;
    	let key_block = create_key_block(ctx);

    	const block = {
    		c: function create() {
    			link = element("link");
    			t = space();
    			key_block.c();
    			key_block_anchor = empty();
    			attr_dev(link, "href", "https://fonts.googleapis.com/icon?family=Material+Icons+Round");
    			attr_dev(link, "rel", "stylesheet");
    			add_location(link, file$h, 33, 6, 681);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t, anchor);
    			key_block.m(target, anchor);
    			insert_dev(target, key_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$counter*/ 8 && safe_not_equal(previous_key, previous_key = /*$counter*/ ctx[3])) {
    				group_outros();
    				transition_out(key_block, 1, 1, noop);
    				check_outros();
    				key_block = create_key_block(ctx);
    				key_block.c();
    				transition_in(key_block);
    				key_block.m(key_block_anchor.parentNode, key_block_anchor);
    			} else {
    				key_block.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(key_block_anchor);
    			key_block.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let $counter;
    	validate_store(counter, 'counter');
    	component_subscribe($$self, counter, $$value => $$invalidate(3, $counter = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Prompt', slots, []);
    	const dispatch = createEventDispatcher();
    	let showSubmit = true;
    	let showFeedback = false;
    	let userChoice;
    	let correct;

    	function onSubmit() {
    		$$invalidate(0, showSubmit = false);
    		$$invalidate(1, showFeedback = true);
    	} //dispatch('proceed');
    	//if (userChoice === sequence[counter].quiz.correct) {

    	//} else {	
    	//}
    	function onReset() {
    		$$invalidate(0, showSubmit = true);
    		$$invalidate(1, showFeedback = false);
    	} //dispatch('reset');

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Prompt> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		userChoice = this.__value;
    		$$invalidate(2, userChoice);
    	}

    	$$self.$capture_state = () => ({
    		fade,
    		slide,
    		scale,
    		fly,
    		createEventDispatcher,
    		Button,
    		sequence,
    		counter,
    		dispatch,
    		showSubmit,
    		showFeedback,
    		userChoice,
    		correct,
    		onSubmit,
    		onReset,
    		$counter
    	});

    	$$self.$inject_state = $$props => {
    		if ('showSubmit' in $$props) $$invalidate(0, showSubmit = $$props.showSubmit);
    		if ('showFeedback' in $$props) $$invalidate(1, showFeedback = $$props.showFeedback);
    		if ('userChoice' in $$props) $$invalidate(2, userChoice = $$props.userChoice);
    		if ('correct' in $$props) correct = $$props.correct;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showSubmit,
    		showFeedback,
    		userChoice,
    		$counter,
    		onSubmit,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class Prompt extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Prompt",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/components/UserNav.svelte generated by Svelte v3.42.6 */
    const file$g = "src/components/UserNav.svelte";

    // (10:1) {#if $counter > 0}
    function create_if_block_1$4(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				color: "white",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[1]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(10:1) {#if $counter > 0}",
    		ctx
    	});

    	return block;
    }

    // (11:2) <Button on:click={() => $counter -=1} color='white'>
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("< Back");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(11:2) <Button on:click={() => $counter -=1} color='white'>",
    		ctx
    	});

    	return block;
    }

    // (14:1) {#if $counter < sequence.length - 1}
    function create_if_block$6(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				color: "black",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler_1*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(14:1) {#if $counter < sequence.length - 1}",
    		ctx
    	});

    	return block;
    }

    // (15:2) <Button on:click={() => $counter +=1} color='black'>
    function create_default_slot$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Next >");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(15:2) <Button on:click={() => $counter +=1} color='black'>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let section;
    	let t;
    	let current;
    	let if_block0 = /*$counter*/ ctx[0] > 0 && create_if_block_1$4(ctx);
    	let if_block1 = /*$counter*/ ctx[0] < sequence.length - 1 && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			attr_dev(section, "class", "svelte-inxasz");
    			add_location(section, file$g, 8, 0, 129);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			if (if_block0) if_block0.m(section, null);
    			append_dev(section, t);
    			if (if_block1) if_block1.m(section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$counter*/ ctx[0] > 0) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*$counter*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(section, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*$counter*/ ctx[0] < sequence.length - 1) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$counter*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$6(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(section, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let $counter;
    	validate_store(counter, 'counter');
    	component_subscribe($$self, counter, $$value => $$invalidate(0, $counter = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('UserNav', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserNav> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(counter, $counter -= 1, $counter);
    	const click_handler_1 = () => set_store_value(counter, $counter += 1, $counter);
    	$$self.$capture_state = () => ({ Button, sequence, counter, $counter });
    	return [$counter, click_handler, click_handler_1];
    }

    class UserNav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserNav",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity$2, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

    function ascending(a, b) {
      return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function bisector(f) {
      let delta = f;
      let compare1 = f;
      let compare2 = f;

      if (f.length === 1) {
        delta = (d, x) => f(d) - x;
        compare1 = ascending;
        compare2 = (d, x) => ascending(f(d), x);
      }

      function left(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
          if (compare1(x, x) !== 0) return hi;
          do {
            const mid = (lo + hi) >>> 1;
            if (compare2(a[mid], x) < 0) lo = mid + 1;
            else hi = mid;
          } while (lo < hi);
        }
        return lo;
      }

      function right(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
          if (compare1(x, x) !== 0) return hi;
          do {
            const mid = (lo + hi) >>> 1;
            if (compare2(a[mid], x) <= 0) lo = mid + 1;
            else hi = mid;
          } while (lo < hi);
        }
        return lo;
      }

      function center(a, x, lo = 0, hi = a.length) {
        const i = left(a, x, lo, hi - 1);
        return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
      }

      return {left, center, right};
    }

    function number$1(x) {
      return x === null ? NaN : +x;
    }

    const ascendingBisect = bisector(ascending);
    const bisectRight = ascendingBisect.right;
    bisector(number$1).center;
    var bisect = bisectRight;

    function extent(values, valueof) {
      let min;
      let max;
      if (valueof === undefined) {
        for (const value of values) {
          if (value != null) {
            if (min === undefined) {
              if (value >= value) min = max = value;
            } else {
              if (min > value) min = value;
              if (max < value) max = value;
            }
          }
        }
      } else {
        let index = -1;
        for (let value of values) {
          if ((value = valueof(value, ++index, values)) != null) {
            if (min === undefined) {
              if (value >= value) min = max = value;
            } else {
              if (min > value) min = value;
              if (max < value) max = value;
            }
          }
        }
      }
      return [min, max];
    }

    var e10 = Math.sqrt(50),
        e5 = Math.sqrt(10),
        e2 = Math.sqrt(2);

    function ticks(start, stop, count) {
      var reverse,
          i = -1,
          n,
          ticks,
          step;

      stop = +stop, start = +start, count = +count;
      if (start === stop && count > 0) return [start];
      if (reverse = stop < start) n = start, start = stop, stop = n;
      if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

      if (step > 0) {
        let r0 = Math.round(start / step), r1 = Math.round(stop / step);
        if (r0 * step < start) ++r0;
        if (r1 * step > stop) --r1;
        ticks = new Array(n = r1 - r0 + 1);
        while (++i < n) ticks[i] = (r0 + i) * step;
      } else {
        step = -step;
        let r0 = Math.round(start * step), r1 = Math.round(stop * step);
        if (r0 / step < start) ++r0;
        if (r1 / step > stop) --r1;
        ticks = new Array(n = r1 - r0 + 1);
        while (++i < n) ticks[i] = (r0 + i) / step;
      }

      if (reverse) ticks.reverse();

      return ticks;
    }

    function tickIncrement(start, stop, count) {
      var step = (stop - start) / Math.max(0, count),
          power = Math.floor(Math.log(step) / Math.LN10),
          error = step / Math.pow(10, power);
      return power >= 0
          ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
          : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
    }

    function tickStep(start, stop, count) {
      var step0 = Math.abs(stop - start) / Math.max(0, count),
          step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
          error = step0 / step1;
      if (error >= e10) step1 *= 10;
      else if (error >= e5) step1 *= 5;
      else if (error >= e2) step1 *= 2;
      return stop < start ? -step1 : step1;
    }

    function initRange(domain, range) {
      switch (arguments.length) {
        case 0: break;
        case 1: this.range(domain); break;
        default: this.range(range).domain(domain); break;
      }
      return this;
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
        reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
        reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
        reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
        reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
        reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable: function() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb: function() {
        return this;
      },
      displayable: function() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    }

    function rgb_formatRgb() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(")
          + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
          + Math.max(0, Math.min(255, Math.round(this.b) || 0))
          + (a === 1 ? ")" : ", " + a + ")");
    }

    function hex(value) {
      value = Math.max(0, Math.min(255, Math.round(value) || 0));
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl: function() {
        var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(")
            + (this.h || 0) + ", "
            + (this.s || 0) * 100 + "%, "
            + (this.l || 0) * 100 + "%"
            + (a === 1 ? ")" : ", " + a + ")");
      }
    }));

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var constant = x => () => x;

    function linear$1(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
    }

    var interpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function numberArray(a, b) {
      if (!b) b = [];
      var n = a ? Math.min(b.length, a.length) : 0,
          c = b.slice(),
          i;
      return function(t) {
        for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
      };
    }

    function isNumberArray(x) {
      return ArrayBuffer.isView(x) && !(x instanceof DataView);
    }

    function genericArray(a, b) {
      var nb = b ? b.length : 0,
          na = a ? Math.min(nb, a.length) : 0,
          x = new Array(na),
          c = new Array(nb),
          i;

      for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
      for (; i < nb; ++i) c[i] = b[i];

      return function(t) {
        for (i = 0; i < na; ++i) c[i] = x[i](t);
        return c;
      };
    }

    function date(a, b) {
      var d = new Date;
      return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
      };
    }

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    function object(a, b) {
      var i = {},
          c = {},
          k;

      if (a === null || typeof a !== "object") a = {};
      if (b === null || typeof b !== "object") b = {};

      for (k in b) {
        if (k in a) {
          i[k] = interpolate(a[k], b[k]);
        } else {
          c[k] = b[k];
        }
      }

      return function(t) {
        for (k in i) c[k] = i[k](t);
        return c;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero(b) {
      return function() {
        return b;
      };
    }

    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    function interpolate(a, b) {
      var t = typeof b, c;
      return b == null || t === "boolean" ? constant(b)
          : (t === "number" ? interpolateNumber
          : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
          : b instanceof color ? interpolateRgb
          : b instanceof Date ? date
          : isNumberArray(b) ? numberArray
          : Array.isArray(b) ? genericArray
          : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
          : interpolateNumber)(a, b);
    }

    function interpolateRound(a, b) {
      return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
      };
    }

    function constants(x) {
      return function() {
        return x;
      };
    }

    function number(x) {
      return +x;
    }

    var unit = [0, 1];

    function identity$1(x) {
      return x;
    }

    function normalize(a, b) {
      return (b -= (a = +a))
          ? function(x) { return (x - a) / b; }
          : constants(isNaN(b) ? NaN : 0.5);
    }

    function clamper(a, b) {
      var t;
      if (a > b) t = a, a = b, b = t;
      return function(x) { return Math.max(a, Math.min(b, x)); };
    }

    // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
    // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
    function bimap(domain, range, interpolate) {
      var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
      if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
      else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
      return function(x) { return r0(d0(x)); };
    }

    function polymap(domain, range, interpolate) {
      var j = Math.min(domain.length, range.length) - 1,
          d = new Array(j),
          r = new Array(j),
          i = -1;

      // Reverse descending domains.
      if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
      }

      while (++i < j) {
        d[i] = normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
      }

      return function(x) {
        var i = bisect(domain, x, 1, j) - 1;
        return r[i](d[i](x));
      };
    }

    function copy(source, target) {
      return target
          .domain(source.domain())
          .range(source.range())
          .interpolate(source.interpolate())
          .clamp(source.clamp())
          .unknown(source.unknown());
    }

    function transformer() {
      var domain = unit,
          range = unit,
          interpolate$1 = interpolate,
          transform,
          untransform,
          unknown,
          clamp = identity$1,
          piecewise,
          output,
          input;

      function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? polymap : bimap;
        output = input = null;
        return scale;
      }

      function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
      }

      scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
      };

      scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
      };

      scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
      };

      scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
      };

      scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
      };

      scale.interpolate = function(_) {
        return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
      };

      scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
      };

      return function(t, u) {
        transform = t, untransform = u;
        return rescale();
      };
    }

    function continuous() {
      return transformer()(identity$1, identity$1);
    }

    function formatDecimal(x) {
      return Math.abs(x = Math.round(x)) >= 1e21
          ? x.toLocaleString("en").replace(/,/g, "")
          : x.toString(10);
    }

    // Computes the decimal coefficient and exponent of the specified number x with
    // significant digits p, where x is positive and p is in [1, 21] or undefined.
    // For example, formatDecimalParts(1.23) returns ["123", 0].
    function formatDecimalParts(x, p) {
      if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
      var i, coefficient = x.slice(0, i);

      // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
      // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
      return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
      ];
    }

    function exponent(x) {
      return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
    }

    function formatGroup(grouping, thousands) {
      return function(value, width) {
        var i = value.length,
            t = [],
            j = 0,
            g = grouping[0],
            length = 0;

        while (i > 0 && g > 0) {
          if (length + g + 1 > width) g = Math.max(1, width - length);
          t.push(value.substring(i -= g, i + g));
          if ((length += g + 1) > width) break;
          g = grouping[j = (j + 1) % grouping.length];
        }

        return t.reverse().join(thousands);
      };
    }

    function formatNumerals(numerals) {
      return function(value) {
        return value.replace(/[0-9]/g, function(i) {
          return numerals[+i];
        });
      };
    }

    // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
    var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function formatSpecifier(specifier) {
      if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
      var match;
      return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
      });
    }

    formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

    function FormatSpecifier(specifier) {
      this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
      this.align = specifier.align === undefined ? ">" : specifier.align + "";
      this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
      this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
      this.zero = !!specifier.zero;
      this.width = specifier.width === undefined ? undefined : +specifier.width;
      this.comma = !!specifier.comma;
      this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
      this.trim = !!specifier.trim;
      this.type = specifier.type === undefined ? "" : specifier.type + "";
    }

    FormatSpecifier.prototype.toString = function() {
      return this.fill
          + this.align
          + this.sign
          + this.symbol
          + (this.zero ? "0" : "")
          + (this.width === undefined ? "" : Math.max(1, this.width | 0))
          + (this.comma ? "," : "")
          + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
          + (this.trim ? "~" : "")
          + this.type;
    };

    // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
    function formatTrim(s) {
      out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".": i0 = i1 = i; break;
          case "0": if (i0 === 0) i0 = i; i1 = i; break;
          default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
        }
      }
      return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
    }

    var prefixExponent;

    function formatPrefixAuto(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1],
          i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
          n = coefficient.length;
      return i === n ? coefficient
          : i > n ? coefficient + new Array(i - n + 1).join("0")
          : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
          : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
    }

    function formatRounded(x, p) {
      var d = formatDecimalParts(x, p);
      if (!d) return x + "";
      var coefficient = d[0],
          exponent = d[1];
      return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
          : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
          : coefficient + new Array(exponent - coefficient.length + 2).join("0");
    }

    var formatTypes = {
      "%": (x, p) => (x * 100).toFixed(p),
      "b": (x) => Math.round(x).toString(2),
      "c": (x) => x + "",
      "d": formatDecimal,
      "e": (x, p) => x.toExponential(p),
      "f": (x, p) => x.toFixed(p),
      "g": (x, p) => x.toPrecision(p),
      "o": (x) => Math.round(x).toString(8),
      "p": (x, p) => formatRounded(x * 100, p),
      "r": formatRounded,
      "s": formatPrefixAuto,
      "X": (x) => Math.round(x).toString(16).toUpperCase(),
      "x": (x) => Math.round(x).toString(16)
    };

    function identity(x) {
      return x;
    }

    var map = Array.prototype.map,
        prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

    function formatLocale(locale) {
      var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
          currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
          currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
          decimal = locale.decimal === undefined ? "." : locale.decimal + "",
          numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
          percent = locale.percent === undefined ? "%" : locale.percent + "",
          minus = locale.minus === undefined ? "−" : locale.minus + "",
          nan = locale.nan === undefined ? "NaN" : locale.nan + "";

      function newFormat(specifier) {
        specifier = formatSpecifier(specifier);

        var fill = specifier.fill,
            align = specifier.align,
            sign = specifier.sign,
            symbol = specifier.symbol,
            zero = specifier.zero,
            width = specifier.width,
            comma = specifier.comma,
            precision = specifier.precision,
            trim = specifier.trim,
            type = specifier.type;

        // The "n" type is an alias for ",g".
        if (type === "n") comma = true, type = "g";

        // The "" type, and any invalid type, is an alias for ".12~g".
        else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

        // If zero fill is specified, padding goes after sign and before digits.
        if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

        // Compute the prefix and suffix.
        // For SI-prefix, the suffix is lazily computed.
        var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
            suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

        // What format function should we use?
        // Is this an integer type?
        // Can this type generate exponential notation?
        var formatType = formatTypes[type],
            maybeSuffix = /[defgprs%]/.test(type);

        // Set the default precision if not specified,
        // or clamp the specified precision to the supported range.
        // For significant precision, it must be in [1, 21].
        // For fixed precision, it must be in [0, 20].
        precision = precision === undefined ? 6
            : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
            : Math.max(0, Math.min(20, precision));

        function format(value) {
          var valuePrefix = prefix,
              valueSuffix = suffix,
              i, n, c;

          if (type === "c") {
            valueSuffix = formatType(value) + valueSuffix;
            value = "";
          } else {
            value = +value;

            // Determine the sign. -0 is not less than 0, but 1 / -0 is!
            var valueNegative = value < 0 || 1 / value < 0;

            // Perform the initial formatting.
            value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

            // Trim insignificant zeros.
            if (trim) value = formatTrim(value);

            // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
            if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

            // Compute the prefix and suffix.
            valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
            valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

            // Break the formatted value into the integer “value” part that can be
            // grouped, and fractional or exponential “suffix” part that is not.
            if (maybeSuffix) {
              i = -1, n = value.length;
              while (++i < n) {
                if (c = value.charCodeAt(i), 48 > c || c > 57) {
                  valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                  value = value.slice(0, i);
                  break;
                }
              }
            }
          }

          // If the fill character is not "0", grouping is applied before padding.
          if (comma && !zero) value = group(value, Infinity);

          // Compute the padding.
          var length = valuePrefix.length + value.length + valueSuffix.length,
              padding = length < width ? new Array(width - length + 1).join(fill) : "";

          // If the fill character is "0", grouping is applied after padding.
          if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

          // Reconstruct the final output based on the desired alignment.
          switch (align) {
            case "<": value = valuePrefix + value + valueSuffix + padding; break;
            case "=": value = valuePrefix + padding + value + valueSuffix; break;
            case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
            default: value = padding + valuePrefix + value + valueSuffix; break;
          }

          return numerals(value);
        }

        format.toString = function() {
          return specifier + "";
        };

        return format;
      }

      function formatPrefix(specifier, value) {
        var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
            e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
            k = Math.pow(10, -e),
            prefix = prefixes[8 + e / 3];
        return function(value) {
          return f(k * value) + prefix;
        };
      }

      return {
        format: newFormat,
        formatPrefix: formatPrefix
      };
    }

    var locale;
    var format;
    var formatPrefix;

    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });

    function defaultLocale(definition) {
      locale = formatLocale(definition);
      format = locale.format;
      formatPrefix = locale.formatPrefix;
      return locale;
    }

    function precisionFixed(step) {
      return Math.max(0, -exponent(Math.abs(step)));
    }

    function precisionPrefix(step, value) {
      return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
    }

    function precisionRound(step, max) {
      step = Math.abs(step), max = Math.abs(max) - step;
      return Math.max(0, exponent(max) - exponent(step)) + 1;
    }

    function tickFormat(start, stop, count, specifier) {
      var step = tickStep(start, stop, count),
          precision;
      specifier = formatSpecifier(specifier == null ? ",f" : specifier);
      switch (specifier.type) {
        case "s": {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }
        case "":
        case "e":
        case "g":
        case "p":
        case "r": {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }
        case "f":
        case "%": {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
      }
      return format(specifier);
    }

    function linearish(scale) {
      var domain = scale.domain;

      scale.ticks = function(count) {
        var d = domain();
        return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
      };

      scale.tickFormat = function(count, specifier) {
        var d = domain();
        return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
      };

      scale.nice = function(count) {
        if (count == null) count = 10;

        var d = domain();
        var i0 = 0;
        var i1 = d.length - 1;
        var start = d[i0];
        var stop = d[i1];
        var prestep;
        var step;
        var maxIter = 10;

        if (stop < start) {
          step = start, start = stop, stop = step;
          step = i0, i0 = i1, i1 = step;
        }
        
        while (maxIter-- > 0) {
          step = tickIncrement(start, stop, count);
          if (step === prestep) {
            d[i0] = start;
            d[i1] = stop;
            return domain(d);
          } else if (step > 0) {
            start = Math.floor(start / step) * step;
            stop = Math.ceil(stop / step) * step;
          } else if (step < 0) {
            start = Math.ceil(start * step) / step;
            stop = Math.floor(stop * step) / step;
          } else {
            break;
          }
          prestep = step;
        }

        return scale;
      };

      return scale;
    }

    function linear() {
      var scale = continuous();

      scale.copy = function() {
        return copy(scale, linear());
      };

      initRange.apply(scale, arguments);

      return linearish(scale);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var d3Regression = createCommonjsModule(function (module, exports) {
    // https://github.com/HarryStevens/d3-regression#readme Version 1.3.9. Copyright 2021 Harry Stevens.
    (function (global, factory) {
      factory(exports) ;
    }(commonjsGlobal, (function (exports) {
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
      }

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }

      // Adapted from vega-statistics by Jeffrey Heer
      // License: https://github.com/vega/vega/blob/f058b099decad9db78301405dd0d2e9d8ba3d51a/LICENSE
      // Source: https://github.com/vega/vega/blob/f058b099decad9db78301405dd0d2e9d8ba3d51a/packages/vega-statistics/src/regression/points.js
      function points(data, x, y, sort) {
        data = data.filter(function (d, i) {
          var u = x(d, i),
              v = y(d, i);
          return u != null && isFinite(u) && v != null && isFinite(v);
        });

        if (sort) {
          data.sort(function (a, b) {
            return x(a) - x(b);
          });
        }

        var n = data.length,
            X = new Float64Array(n),
            Y = new Float64Array(n); // extract values, calculate means

        var ux = 0,
            uy = 0,
            xv,
            yv,
            d;

        for (var i = 0; i < n;) {
          d = data[i];
          X[i] = xv = +x(d, i, data);
          Y[i] = yv = +y(d, i, data);
          ++i;
          ux += (xv - ux) / i;
          uy += (yv - uy) / i;
        } // mean center the data


        for (var _i = 0; _i < n; ++_i) {
          X[_i] -= ux;
          Y[_i] -= uy;
        }

        return [X, Y, ux, uy];
      }
      function visitPoints(data, x, y, cb) {
        var iterations = 0;

        for (var i = 0, n = data.length; i < n; i++) {
          var d = data[i],
              dx = +x(d, i, data),
              dy = +y(d, i, data);

          if (dx != null && isFinite(dx) && dy != null && isFinite(dy)) {
            cb(dx, dy, iterations++);
          }
        }
      }

      // return the coefficient of determination, or R squared.

      function determination(data, x, y, uY, predict) {
        var SSE = 0,
            SST = 0;
        visitPoints(data, x, y, function (dx, dy) {
          var sse = dy - predict(dx),
              sst = dy - uY;
          SSE += sse * sse;
          SST += sst * sst;
        });
        return 1 - SSE / SST;
      }

      // Returns the angle of a line in degrees.
      function angle(line) {
        return Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]) * 180 / Math.PI;
      } // Returns the midpoint of a line.

      function midpoint(line) {
        return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
      }

      // returns a smooth line.

      function interpose(xmin, xmax, predict) {
        var l = Math.log(xmax - xmin) * Math.LOG10E + 1 | 0;
        var precision = 1 * Math.pow(10, -l / 2 - 1),
            maxIter = 1e4;
        var points = [px(xmin), px(xmax)],
            iter = 0;

        while (find(points) && iter < maxIter) {
        }

        return points;

        function px(x) {
          return [x, predict(x)];
        }

        function find(points) {
          iter++;
          var n = points.length;
          var found = false;

          for (var i = 0; i < n - 1; i++) {
            var p0 = points[i],
                p1 = points[i + 1],
                m = midpoint([p0, p1]),
                mp = px(m[0]),
                a0 = angle([p0, m]),
                a1 = angle([p0, mp]),
                a = Math.abs(a0 - a1);

            if (a > precision) {
              points.splice(i + 1, 0, mp);
              found = true;
            }
          }

          return found;
        }
      }

      // Ordinary Least Squares from vega-statistics by Jeffrey Heer
      // License: https://github.com/vega/vega/blob/f058b099decad9db78301405dd0d2e9d8ba3d51a/LICENSE
      // Source: https://github.com/vega/vega/blob/f058b099decad9db78301405dd0d2e9d8ba3d51a/packages/vega-statistics/src/regression/ols.js
      function ols(uX, uY, uXY, uX2) {
        var delta = uX2 - uX * uX,
            slope = Math.abs(delta) < 1e-24 ? 0 : (uXY - uX * uY) / delta,
            intercept = uY - slope * uX;
        return [intercept, slope];
      }

      function exponential () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            domain;

        function exponential(data) {
          var n = 0,
              Y = 0,
              YL = 0,
              XY = 0,
              XYL = 0,
              X2Y = 0,
              xmin = domain ? +domain[0] : Infinity,
              xmax = domain ? +domain[1] : -Infinity;
          visitPoints(data, x, y, function (dx, dy) {
            var ly = Math.log(dy),
                xy = dx * dy;
            ++n;
            Y += (dy - Y) / n;
            XY += (xy - XY) / n;
            X2Y += (dx * xy - X2Y) / n;
            YL += (dy * ly - YL) / n;
            XYL += (xy * ly - XYL) / n;

            if (!domain) {
              if (dx < xmin) xmin = dx;
              if (dx > xmax) xmax = dx;
            }
          });

          var _ols = ols(XY / Y, YL / Y, XYL / Y, X2Y / Y),
              _ols2 = _slicedToArray(_ols, 2),
              a = _ols2[0],
              b = _ols2[1];

          a = Math.exp(a);

          var fn = function fn(x) {
            return a * Math.exp(b * x);
          },
              out = interpose(xmin, xmax, fn);

          out.a = a;
          out.b = b;
          out.predict = fn;
          out.rSquared = determination(data, x, y, Y, fn);
          return out;
        }

        exponential.domain = function (arr) {
          return arguments.length ? (domain = arr, exponential) : domain;
        };

        exponential.x = function (fn) {
          return arguments.length ? (x = fn, exponential) : x;
        };

        exponential.y = function (fn) {
          return arguments.length ? (y = fn, exponential) : y;
        };

        return exponential;
      }

      function linear () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            domain;

        function linear(data) {
          var n = 0,
              X = 0,
              // sum of x
          Y = 0,
              // sum of y
          XY = 0,
              // sum of x * y
          X2 = 0,
              // sum of x * x
          xmin = domain ? +domain[0] : Infinity,
              xmax = domain ? +domain[1] : -Infinity;
          visitPoints(data, x, y, function (dx, dy) {
            ++n;
            X += (dx - X) / n;
            Y += (dy - Y) / n;
            XY += (dx * dy - XY) / n;
            X2 += (dx * dx - X2) / n;

            if (!domain) {
              if (dx < xmin) xmin = dx;
              if (dx > xmax) xmax = dx;
            }
          });

          var _ols = ols(X, Y, XY, X2),
              _ols2 = _slicedToArray(_ols, 2),
              intercept = _ols2[0],
              slope = _ols2[1],
              fn = function fn(x) {
            return slope * x + intercept;
          },
              out = [[xmin, fn(xmin)], [xmax, fn(xmax)]];

          out.a = slope;
          out.b = intercept;
          out.predict = fn;
          out.rSquared = determination(data, x, y, Y, fn);
          return out;
        }

        linear.domain = function (arr) {
          return arguments.length ? (domain = arr, linear) : domain;
        };

        linear.x = function (fn) {
          return arguments.length ? (x = fn, linear) : x;
        };

        linear.y = function (fn) {
          return arguments.length ? (y = fn, linear) : y;
        };

        return linear;
      }

      // Returns the medium value of an array of numbers.
      function median(arr) {
        arr.sort(function (a, b) {
          return a - b;
        });
        var i = arr.length / 2;
        return i % 1 === 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
      }

      var maxiters = 2,
          epsilon = 1e-12;
      function loess () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            bandwidth = .3;

        function loess(data) {
          var _points = points(data, x, y, true),
              _points2 = _slicedToArray(_points, 4),
              xv = _points2[0],
              yv = _points2[1],
              ux = _points2[2],
              uy = _points2[3],
              n = xv.length,
              bw = Math.max(2, ~~(bandwidth * n)),
              yhat = new Float64Array(n),
              residuals = new Float64Array(n),
              robustWeights = new Float64Array(n).fill(1);

          for (var iter = -1; ++iter <= maxiters;) {
            var interval = [0, bw - 1];

            for (var i = 0; i < n; ++i) {
              var dx = xv[i],
                  i0 = interval[0],
                  i1 = interval[1],
                  edge = dx - xv[i0] > xv[i1] - dx ? i0 : i1;
              var W = 0,
                  X = 0,
                  Y = 0,
                  XY = 0,
                  X2 = 0,
                  denom = 1 / Math.abs(xv[edge] - dx || 1); // Avoid singularity

              for (var k = i0; k <= i1; ++k) {
                var xk = xv[k],
                    yk = yv[k],
                    w = tricube(Math.abs(dx - xk) * denom) * robustWeights[k],
                    xkw = xk * w;
                W += w;
                X += xkw;
                Y += yk * w;
                XY += yk * xkw;
                X2 += xk * xkw;
              } // Linear regression fit


              var _ols = ols(X / W, Y / W, XY / W, X2 / W),
                  _ols2 = _slicedToArray(_ols, 2),
                  a = _ols2[0],
                  b = _ols2[1];

              yhat[i] = a + b * dx;
              residuals[i] = Math.abs(yv[i] - yhat[i]);
              updateInterval(xv, i + 1, interval);
            }

            if (iter === maxiters) {
              break;
            }

            var medianResidual = median(residuals);
            if (Math.abs(medianResidual) < epsilon) break;

            for (var _i = 0, arg, _w; _i < n; ++_i) {
              arg = residuals[_i] / (6 * medianResidual); // Default to epsilon (rather than zero) for large deviations
              // Keeping weights tiny but non-zero prevents singularites

              robustWeights[_i] = arg >= 1 ? epsilon : (_w = 1 - arg * arg) * _w;
            }
          }

          return output(xv, yhat, ux, uy);
        }

        loess.bandwidth = function (bw) {
          return arguments.length ? (bandwidth = bw, loess) : bandwidth;
        };

        loess.x = function (fn) {
          return arguments.length ? (x = fn, loess) : x;
        };

        loess.y = function (fn) {
          return arguments.length ? (y = fn, loess) : y;
        };

        return loess;
      } // Weighting kernel for local regression

      function tricube(x) {
        return (x = 1 - x * x * x) * x * x;
      } // Advance sliding window interval of nearest neighbors


      function updateInterval(xv, i, interval) {
        var val = xv[i],
            left = interval[0],
            right = interval[1] + 1;
        if (right >= xv.length) return; // Step right if distance to new right edge is <= distance to old left edge
        // Step when distance is equal to ensure movement over duplicate x values

        while (i > left && xv[right] - val <= val - xv[left]) {
          interval[0] = ++left;
          interval[1] = right;
          ++right;
        }
      } // Generate smoothed output points
      // Average points with repeated x values


      function output(xv, yhat, ux, uy) {
        var n = xv.length,
            out = [];
        var i = 0,
            cnt = 0,
            prev = [],
            v;

        for (; i < n; ++i) {
          v = xv[i] + ux;

          if (prev[0] === v) {
            // Average output values via online update
            prev[1] += (yhat[i] - prev[1]) / ++cnt;
          } else {
            // Add new output point
            cnt = 0;
            prev[1] += uy;
            prev = [v, yhat[i]];
            out.push(prev);
          }
        }

        prev[1] += uy;
        return out;
      }

      function logarithmic () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            base = Math.E,
            domain;

        function logarithmic(data) {
          var n = 0,
              X = 0,
              Y = 0,
              XY = 0,
              X2 = 0,
              xmin = domain ? +domain[0] : Infinity,
              xmax = domain ? +domain[1] : -Infinity,
              lb = Math.log(base);
          visitPoints(data, x, y, function (dx, dy) {
            var lx = Math.log(dx) / lb;
            ++n;
            X += (lx - X) / n;
            Y += (dy - Y) / n;
            XY += (lx * dy - XY) / n;
            X2 += (lx * lx - X2) / n;

            if (!domain) {
              if (dx < xmin) xmin = dx;
              if (dx > xmax) xmax = dx;
            }
          });

          var _ols = ols(X, Y, XY, X2),
              _ols2 = _slicedToArray(_ols, 2),
              intercept = _ols2[0],
              slope = _ols2[1],
              fn = function fn(x) {
            return slope * Math.log(x) / lb + intercept;
          },
              out = interpose(xmin, xmax, fn);

          out.a = slope;
          out.b = intercept;
          out.predict = fn;
          out.rSquared = determination(data, x, y, Y, fn);
          return out;
        }

        logarithmic.domain = function (arr) {
          return arguments.length ? (domain = arr, logarithmic) : domain;
        };

        logarithmic.x = function (fn) {
          return arguments.length ? (x = fn, logarithmic) : x;
        };

        logarithmic.y = function (fn) {
          return arguments.length ? (y = fn, logarithmic) : y;
        };

        logarithmic.base = function (n) {
          return arguments.length ? (base = n, logarithmic) : base;
        };

        return logarithmic;
      }

      function quad () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            domain;

        function quadratic(data) {
          var _points = points(data, x, y),
              _points2 = _slicedToArray(_points, 4),
              xv = _points2[0],
              yv = _points2[1],
              ux = _points2[2],
              uy = _points2[3],
              n = xv.length;

          var X2 = 0,
              X3 = 0,
              X4 = 0,
              XY = 0,
              X2Y = 0,
              i,
              dx,
              dy,
              x2;

          for (i = 0; i < n;) {
            dx = xv[i];
            dy = yv[i++];
            x2 = dx * dx;
            X2 += (x2 - X2) / i;
            X3 += (x2 * dx - X3) / i;
            X4 += (x2 * x2 - X4) / i;
            XY += (dx * dy - XY) / i;
            X2Y += (x2 * dy - X2Y) / i;
          }

          var Y = 0,
              n0 = 0,
              xmin = domain ? +domain[0] : Infinity,
              xmax = domain ? +domain[1] : -Infinity;
          visitPoints(data, x, y, function (dx, dy) {
            n0++;
            Y += (dy - Y) / n0;

            if (!domain) {
              if (dx < xmin) xmin = dx;
              if (dx > xmax) xmax = dx;
            }
          });

          var X2X2 = X4 - X2 * X2,
              d = X2 * X2X2 - X3 * X3,
              a = (X2Y * X2 - XY * X3) / d,
              b = (XY * X2X2 - X2Y * X3) / d,
              c = -a * X2,
              fn = function fn(x) {
            x = x - ux;
            return a * x * x + b * x + c + uy;
          };

          var out = interpose(xmin, xmax, fn);
          out.a = a;
          out.b = b - 2 * a * ux;
          out.c = c - b * ux + a * ux * ux + uy;
          out.predict = fn;
          out.rSquared = determination(data, x, y, Y, fn);
          return out;
        }

        quadratic.domain = function (arr) {
          return arguments.length ? (domain = arr, quadratic) : domain;
        };

        quadratic.x = function (fn) {
          return arguments.length ? (x = fn, quadratic) : x;
        };

        quadratic.y = function (fn) {
          return arguments.length ? (y = fn, quadratic) : y;
        };

        return quadratic;
      }

      // Source: https://github.com/Tom-Alexander/regression-js/blob/master/src/regression.js#L246
      // License: https://github.com/Tom-Alexander/regression-js/blob/master/LICENSE
      // ...with ideas from vega-statistics by Jeffrey Heer
      // Source: https://github.com/vega/vega/blob/f21cb8792b4e0cbe2b1a3fd44b0f5db370dbaadb/packages/vega-statistics/src/regression/poly.js
      // License: https://github.com/vega/vega/blob/f058b099decad9db78301405dd0d2e9d8ba3d51a/LICENSE

      function polynomial () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            order = 3,
            domain;

        function polynomial(data) {
          // Use more efficient methods for lower orders
          if (order === 1) {
            var o = linear().x(x).y(y).domain(domain)(data);
            o.coefficients = [o.b, o.a];
            delete o.a;
            delete o.b;
            return o;
          }

          if (order === 2) {
            var _o = quad().x(x).y(y).domain(domain)(data);

            _o.coefficients = [_o.c, _o.b, _o.a];
            delete _o.a;
            delete _o.b;
            delete _o.c;
            return _o;
          }

          var _points = points(data, x, y),
              _points2 = _slicedToArray(_points, 4),
              xv = _points2[0],
              yv = _points2[1],
              ux = _points2[2],
              uy = _points2[3],
              n = xv.length,
              lhs = [],
              rhs = [],
              k = order + 1;

          var Y = 0,
              n0 = 0,
              xmin = domain ? +domain[0] : Infinity,
              xmax = domain ? +domain[1] : -Infinity;
          visitPoints(data, x, y, function (dx, dy) {
            ++n0;
            Y += (dy - Y) / n0;

            if (!domain) {
              if (dx < xmin) xmin = dx;
              if (dx > xmax) xmax = dx;
            }
          });
          var i, j, l, v, c;

          for (i = 0; i < k; ++i) {
            for (l = 0, v = 0; l < n; ++l) {
              v += Math.pow(xv[l], i) * yv[l];
            }

            lhs.push(v);
            c = new Float64Array(k);

            for (j = 0; j < k; ++j) {
              for (l = 0, v = 0; l < n; ++l) {
                v += Math.pow(xv[l], i + j);
              }

              c[j] = v;
            }

            rhs.push(c);
          }

          rhs.push(lhs);

          var coef = gaussianElimination(rhs),
              fn = function fn(x) {
            x -= ux;
            var y = uy + coef[0] + coef[1] * x + coef[2] * x * x;

            for (i = 3; i < k; ++i) {
              y += coef[i] * Math.pow(x, i);
            }

            return y;
          },
              out = interpose(xmin, xmax, fn);

          out.coefficients = uncenter(k, coef, -ux, uy);
          out.predict = fn;
          out.rSquared = determination(data, x, y, Y, fn);
          return out;
        }

        polynomial.domain = function (arr) {
          return arguments.length ? (domain = arr, polynomial) : domain;
        };

        polynomial.x = function (fn) {
          return arguments.length ? (x = fn, polynomial) : x;
        };

        polynomial.y = function (fn) {
          return arguments.length ? (y = fn, polynomial) : y;
        };

        polynomial.order = function (n) {
          return arguments.length ? (order = n, polynomial) : order;
        };

        return polynomial;
      }

      function uncenter(k, a, x, y) {
        var z = Array(k);
        var i, j, v, c; // initialize to zero

        for (i = 0; i < k; ++i) {
          z[i] = 0;
        } // polynomial expansion


        for (i = k - 1; i >= 0; --i) {
          v = a[i];
          c = 1;
          z[i] += v;

          for (j = 1; j <= i; ++j) {
            c *= (i + 1 - j) / j; // binomial coefficent

            z[i - j] += v * Math.pow(x, j) * c;
          }
        } // bias term


        z[0] += y;
        return z;
      } // Given an array for a two-dimensional matrix and the polynomial order,
      // solve A * x = b using Gaussian elimination.


      function gaussianElimination(matrix) {
        var n = matrix.length - 1,
            coef = [];
        var i, j, k, r, t;

        for (i = 0; i < n; ++i) {
          r = i; // max row

          for (j = i + 1; j < n; ++j) {
            if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][r])) {
              r = j;
            }
          }

          for (k = i; k < n + 1; ++k) {
            t = matrix[k][i];
            matrix[k][i] = matrix[k][r];
            matrix[k][r] = t;
          }

          for (j = i + 1; j < n; ++j) {
            for (k = n; k >= i; k--) {
              matrix[k][j] -= matrix[k][i] * matrix[i][j] / matrix[i][i];
            }
          }
        }

        for (j = n - 1; j >= 0; --j) {
          t = 0;

          for (k = j + 1; k < n; ++k) {
            t += matrix[k][j] * coef[k];
          }

          coef[j] = (matrix[n][j] - t) / matrix[j][j];
        }

        return coef;
      }

      function power () {
        var x = function x(d) {
          return d[0];
        },
            y = function y(d) {
          return d[1];
        },
            domain;

        function power(data) {
          var n = 0,
              X = 0,
              Y = 0,
              XY = 0,
              X2 = 0,
              YS = 0,
              xmin = domain ? +domain[0] : Infinity,
              xmax = domain ? +domain[1] : -Infinity;
          visitPoints(data, x, y, function (dx, dy) {
            var lx = Math.log(dx),
                ly = Math.log(dy);
            ++n;
            X += (lx - X) / n;
            Y += (ly - Y) / n;
            XY += (lx * ly - XY) / n;
            X2 += (lx * lx - X2) / n;
            YS += (dy - YS) / n;

            if (!domain) {
              if (dx < xmin) xmin = dx;
              if (dx > xmax) xmax = dx;
            }
          });

          var _ols = ols(X, Y, XY, X2),
              _ols2 = _slicedToArray(_ols, 2),
              a = _ols2[0],
              b = _ols2[1];

          a = Math.exp(a);

          var fn = function fn(x) {
            return a * Math.pow(x, b);
          },
              out = interpose(xmin, xmax, fn);

          out.a = a;
          out.b = b;
          out.predict = fn;
          out.rSquared = determination(data, x, y, YS, fn);
          return out;
        }

        power.domain = function (arr) {
          return arguments.length ? (domain = arr, power) : domain;
        };

        power.x = function (fn) {
          return arguments.length ? (x = fn, power) : x;
        };

        power.y = function (fn) {
          return arguments.length ? (y = fn, power) : y;
        };

        return power;
      }

      exports.regressionExp = exponential;
      exports.regressionLinear = linear;
      exports.regressionLoess = loess;
      exports.regressionLog = logarithmic;
      exports.regressionPoly = polynomial;
      exports.regressionPow = power;
      exports.regressionQuad = quad;

      Object.defineProperty(exports, '__esModule', { value: true });

    })));
    });

    const member = writable('a');

    const points = {
    	a: [
    		{ x: 4, y: 5 },
    		{ x: 5, y: 8 },
    		{ x: 6, y: 7 },
    		{ x: 7, y: 5 },
    		{ x: 8, y: 7 },
    		{ x: 9, y: 9 },
    		{ x: 10, y: 8 },
    		{ x: 11, y: 8 },
    		{ x: 12, y: 11 },
    		{ x: 13, y: 8 },
    		{ x: 14, y: 10 }
    	],
    	b: [
    		{ x: 10, y: 9.14 },
    		{ x: 8, y: 8.14 },
    		{ x: 13, y: 8.74 },
    		{ x: 9, y: 8.77 },
    		{ x: 11, y: 9.26 },
    		{ x: 14, y: 8.1 },
    		{ x: 6, y: 6.13 },
    		{ x: 4, y: 3.1 },
    		{ x: 12, y: 9.13 },
    		{ x: 7, y: 7.26 },
    		{ x: 5, y: 4.74 }
    	],
    	c: [
    		{ x: 10, y: 7.46 },
    		{ x: 8, y: 6.77 },
    		{ x: 13, y: 12.74 },
    		{ x: 9, y: 7.11 },
    		{ x: 11, y: 7.81 },
    		{ x: 14, y: 8.84 },
    		{ x: 6, y: 6.08 },
    		{ x: 4, y: 5.39 },
    		{ x: 12, y: 8.15 },
    		{ x: 7, y: 6.42 },
    		{ x: 5, y: 5.73 }
    	],
    	d: [
    		{ x: 8, y: 6.58 },
    		{ x: 8, y: 5.76 },
    		{ x: 8, y: 7.71 },
    		{ x: 8, y: 8.84 },
    		{ x: 8, y: 8.47 },
    		{ x: 8, y: 7.04 },
    		{ x: 8, y: 5.25 },
    		{ x: 19, y: 12.5 },
    		{ x: 8, y: 5.56 },
    		{ x: 8, y: 7.91 },
    		{ x: 8, y: 6.89 }
    	]
    };

    // linear regression constructor
    const linearRegression = d3Regression.regressionLinear()
    .x(d => d.x)
    .y(d => d.y)
    .domain([0, 20]); 

    //linear regression values
    //returns an object that includes best fit line endpoints, slope, y-intercept, and a predict(x) return y function
    const regressionLineStore = derived(member, $member => linearRegression(points[$member]));

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

    /* src/components/Circle.svelte generated by Svelte v3.42.6 */

    const file$f = "src/components/Circle.svelte";

    function create_fragment$f(ctx) {
    	let circle;
    	let circle_data_tooltip_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			circle = svg_element("circle");
    			attr_dev(circle, "data-tooltip", circle_data_tooltip_value = "" + (/*cx*/ ctx[0] + "," + /*cy*/ ctx[1]));
    			attr_dev(circle, "r", /*r*/ ctx[5]);
    			attr_dev(circle, "cx", /*cx*/ ctx[0]);
    			attr_dev(circle, "cy", /*cy*/ ctx[1]);
    			attr_dev(circle, "id", /*id*/ ctx[2]);
    			attr_dev(circle, "class", "svelte-gf9hu8");
    			toggle_class(circle, "highlighted", /*id*/ ctx[2] == /*highlightId*/ ctx[3]);
    			toggle_class(circle, "clickable", /*showHighlighting*/ ctx[4]);
    			add_location(circle, file$f, 12, 0, 167);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, circle, anchor);

    			if (!mounted) {
    				dispose = listen_dev(circle, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*cx, cy*/ 3 && circle_data_tooltip_value !== (circle_data_tooltip_value = "" + (/*cx*/ ctx[0] + "," + /*cy*/ ctx[1]))) {
    				attr_dev(circle, "data-tooltip", circle_data_tooltip_value);
    			}

    			if (dirty & /*cx*/ 1) {
    				attr_dev(circle, "cx", /*cx*/ ctx[0]);
    			}

    			if (dirty & /*cy*/ 2) {
    				attr_dev(circle, "cy", /*cy*/ ctx[1]);
    			}

    			if (dirty & /*id*/ 4) {
    				attr_dev(circle, "id", /*id*/ ctx[2]);
    			}

    			if (dirty & /*id, highlightId*/ 12) {
    				toggle_class(circle, "highlighted", /*id*/ ctx[2] == /*highlightId*/ ctx[3]);
    			}

    			if (dirty & /*showHighlighting*/ 16) {
    				toggle_class(circle, "clickable", /*showHighlighting*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(circle);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Circle', slots, []);
    	let { cx = 0 } = $$props;
    	let { cy = 0 } = $$props;
    	let { id } = $$props;
    	let { highlightId } = $$props;
    	let { showHighlighting } = $$props;
    	let r = 8;
    	let fill = 'grey';
    	const writable_props = ['cx', 'cy', 'id', 'highlightId', 'showHighlighting'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Circle> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('cx' in $$props) $$invalidate(0, cx = $$props.cx);
    		if ('cy' in $$props) $$invalidate(1, cy = $$props.cy);
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    		if ('highlightId' in $$props) $$invalidate(3, highlightId = $$props.highlightId);
    		if ('showHighlighting' in $$props) $$invalidate(4, showHighlighting = $$props.showHighlighting);
    	};

    	$$self.$capture_state = () => ({
    		cx,
    		cy,
    		id,
    		highlightId,
    		showHighlighting,
    		r,
    		fill
    	});

    	$$self.$inject_state = $$props => {
    		if ('cx' in $$props) $$invalidate(0, cx = $$props.cx);
    		if ('cy' in $$props) $$invalidate(1, cy = $$props.cy);
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    		if ('highlightId' in $$props) $$invalidate(3, highlightId = $$props.highlightId);
    		if ('showHighlighting' in $$props) $$invalidate(4, showHighlighting = $$props.showHighlighting);
    		if ('r' in $$props) $$invalidate(5, r = $$props.r);
    		if ('fill' in $$props) fill = $$props.fill;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cx, cy, id, highlightId, showHighlighting, r, click_handler];
    }

    class Circle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
    			cx: 0,
    			cy: 1,
    			id: 2,
    			highlightId: 3,
    			showHighlighting: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Circle",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[2] === undefined && !('id' in props)) {
    			console.warn("<Circle> was created without expected prop 'id'");
    		}

    		if (/*highlightId*/ ctx[3] === undefined && !('highlightId' in props)) {
    			console.warn("<Circle> was created without expected prop 'highlightId'");
    		}

    		if (/*showHighlighting*/ ctx[4] === undefined && !('showHighlighting' in props)) {
    			console.warn("<Circle> was created without expected prop 'showHighlighting'");
    		}
    	}

    	get cx() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cx(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cy() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cy(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlightId() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightId(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showHighlighting() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showHighlighting(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Axis.svelte generated by Svelte v3.42.6 */

    const file$e = "src/components/Axis.svelte";

    // (18:0) {:else}
    function create_else_block(ctx) {
    	let g;
    	let line;
    	let text_1;
    	let t;

    	const block = {
    		c: function create() {
    			g = svg_element("g");
    			line = svg_element("line");
    			text_1 = svg_element("text");
    			t = text(/*text*/ ctx[8]);
    			attr_dev(line, "x1", /*x1*/ ctx[3]);
    			attr_dev(line, "x2", /*x2*/ ctx[4]);
    			attr_dev(line, "class", "svelte-1bltftj");
    			add_location(line, file$e, 19, 1, 471);
    			attr_dev(text_1, "x", /*x*/ ctx[2]);
    			attr_dev(text_1, "y", /*y*/ ctx[5]);
    			set_style(text_1, "font-size", "14px");
    			set_style(text_1, "fill", "#82828");
    			set_style(text_1, "text-anchor", "end");
    			add_location(text_1, file$e, 20, 1, 500);
    			attr_dev(g, "class", "tick svelte-1bltftj");
    			attr_dev(g, "transform", /*translate*/ ctx[1]);
    			add_location(g, file$e, 18, 0, 429);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			append_dev(g, line);
    			append_dev(g, text_1);
    			append_dev(text_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*x1*/ 8) {
    				attr_dev(line, "x1", /*x1*/ ctx[3]);
    			}

    			if (dirty & /*x2*/ 16) {
    				attr_dev(line, "x2", /*x2*/ ctx[4]);
    			}

    			if (dirty & /*text*/ 256) set_data_dev(t, /*text*/ ctx[8]);

    			if (dirty & /*x*/ 4) {
    				attr_dev(text_1, "x", /*x*/ ctx[2]);
    			}

    			if (dirty & /*y*/ 32) {
    				attr_dev(text_1, "y", /*y*/ ctx[5]);
    			}

    			if (dirty & /*translate*/ 2) {
    				attr_dev(g, "transform", /*translate*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(18:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (13:0) {#if axisType == 'xAxis'}
    function create_if_block$5(ctx) {
    	let g;
    	let line;
    	let text_1;
    	let t;

    	const block = {
    		c: function create() {
    			g = svg_element("g");
    			line = svg_element("line");
    			text_1 = svg_element("text");
    			t = text(/*text*/ ctx[8]);
    			attr_dev(line, "y1", /*y1*/ ctx[6]);
    			attr_dev(line, "y2", /*y2*/ ctx[7]);
    			attr_dev(line, "class", "svelte-1bltftj");
    			add_location(line, file$e, 14, 1, 304);
    			attr_dev(text_1, "y", /*y*/ ctx[5]);
    			set_style(text_1, "font-size", "14px");
    			set_style(text_1, "fill", "#82828");
    			set_style(text_1, "text-anchor", "middle");
    			add_location(text_1, file$e, 15, 1, 333);
    			attr_dev(g, "class", "tick svelte-1bltftj");
    			attr_dev(g, "transform", /*translate*/ ctx[1]);
    			add_location(g, file$e, 13, 0, 262);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			append_dev(g, line);
    			append_dev(g, text_1);
    			append_dev(text_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*y1*/ 64) {
    				attr_dev(line, "y1", /*y1*/ ctx[6]);
    			}

    			if (dirty & /*y2*/ 128) {
    				attr_dev(line, "y2", /*y2*/ ctx[7]);
    			}

    			if (dirty & /*text*/ 256) set_data_dev(t, /*text*/ ctx[8]);

    			if (dirty & /*y*/ 32) {
    				attr_dev(text_1, "y", /*y*/ ctx[5]);
    			}

    			if (dirty & /*translate*/ 2) {
    				attr_dev(g, "transform", /*translate*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(13:0) {#if axisType == 'xAxis'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*axisType*/ ctx[0] == 'xAxis') return create_if_block$5;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Axis', slots, []);
    	let { axisType = 'xAxis' } = $$props;
    	let { translate = 'translate(0, 0)' } = $$props;
    	let { x = 0 } = $$props;
    	let { x1 = 0 } = $$props;
    	let { x2 = 0 } = $$props;
    	let { y = 4 } = $$props;
    	let { y1 = 0 } = $$props;
    	let { y2 = 0 } = $$props;
    	let { text = '' } = $$props;
    	const writable_props = ['axisType', 'translate', 'x', 'x1', 'x2', 'y', 'y1', 'y2', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Axis> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('axisType' in $$props) $$invalidate(0, axisType = $$props.axisType);
    		if ('translate' in $$props) $$invalidate(1, translate = $$props.translate);
    		if ('x' in $$props) $$invalidate(2, x = $$props.x);
    		if ('x1' in $$props) $$invalidate(3, x1 = $$props.x1);
    		if ('x2' in $$props) $$invalidate(4, x2 = $$props.x2);
    		if ('y' in $$props) $$invalidate(5, y = $$props.y);
    		if ('y1' in $$props) $$invalidate(6, y1 = $$props.y1);
    		if ('y2' in $$props) $$invalidate(7, y2 = $$props.y2);
    		if ('text' in $$props) $$invalidate(8, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({
    		axisType,
    		translate,
    		x,
    		x1,
    		x2,
    		y,
    		y1,
    		y2,
    		text
    	});

    	$$self.$inject_state = $$props => {
    		if ('axisType' in $$props) $$invalidate(0, axisType = $$props.axisType);
    		if ('translate' in $$props) $$invalidate(1, translate = $$props.translate);
    		if ('x' in $$props) $$invalidate(2, x = $$props.x);
    		if ('x1' in $$props) $$invalidate(3, x1 = $$props.x1);
    		if ('x2' in $$props) $$invalidate(4, x2 = $$props.x2);
    		if ('y' in $$props) $$invalidate(5, y = $$props.y);
    		if ('y1' in $$props) $$invalidate(6, y1 = $$props.y1);
    		if ('y2' in $$props) $$invalidate(7, y2 = $$props.y2);
    		if ('text' in $$props) $$invalidate(8, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [axisType, translate, x, x1, x2, y, y1, y2, text];
    }

    class Axis extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			axisType: 0,
    			translate: 1,
    			x: 2,
    			x1: 3,
    			x2: 4,
    			y: 5,
    			y1: 6,
    			y2: 7,
    			text: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Axis",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get axisType() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set axisType(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translate() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translate(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get x() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get x1() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x1(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get x2() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x2(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y1() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y1(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y2() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y2(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Axis>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Axis>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/RegressionLine.svelte generated by Svelte v3.42.6 */
    const file$d = "src/components/RegressionLine.svelte";

    function create_fragment$d(ctx) {
    	let line;
    	let line_x__value;
    	let line_x__value_1;
    	let line_y__value;
    	let line_y__value_1;
    	let line_transition;
    	let current;

    	const block = {
    		c: function create() {
    			line = svg_element("line");
    			attr_dev(line, "transform", /*translate*/ ctx[2]);
    			attr_dev(line, "x1", line_x__value = /*xScale*/ ctx[0](/*$regressionLineStore*/ ctx[6][0][0]));
    			attr_dev(line, "x2", line_x__value_1 = /*xScale*/ ctx[0](/*$regressionLineStore*/ ctx[6][1][0]));
    			attr_dev(line, "y1", line_y__value = /*yScale*/ ctx[1](/*$regressionLineStore*/ ctx[6][0][1]));
    			attr_dev(line, "y2", line_y__value_1 = /*yScale*/ ctx[1](/*$regressionLineStore*/ ctx[6][1][1]));
    			attr_dev(line, "stroke-width", /*strokeWidth*/ ctx[3]);
    			attr_dev(line, "stroke-dasharray", /*strokeDasharray*/ ctx[4]);
    			attr_dev(line, "opacity", /*opacity*/ ctx[5]);
    			add_location(line, file$d, 14, 0, 307);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, line, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*translate*/ 4) {
    				attr_dev(line, "transform", /*translate*/ ctx[2]);
    			}

    			if (!current || dirty & /*xScale, $regressionLineStore*/ 65 && line_x__value !== (line_x__value = /*xScale*/ ctx[0](/*$regressionLineStore*/ ctx[6][0][0]))) {
    				attr_dev(line, "x1", line_x__value);
    			}

    			if (!current || dirty & /*xScale, $regressionLineStore*/ 65 && line_x__value_1 !== (line_x__value_1 = /*xScale*/ ctx[0](/*$regressionLineStore*/ ctx[6][1][0]))) {
    				attr_dev(line, "x2", line_x__value_1);
    			}

    			if (!current || dirty & /*yScale, $regressionLineStore*/ 66 && line_y__value !== (line_y__value = /*yScale*/ ctx[1](/*$regressionLineStore*/ ctx[6][0][1]))) {
    				attr_dev(line, "y1", line_y__value);
    			}

    			if (!current || dirty & /*yScale, $regressionLineStore*/ 66 && line_y__value_1 !== (line_y__value_1 = /*yScale*/ ctx[1](/*$regressionLineStore*/ ctx[6][1][1]))) {
    				attr_dev(line, "y2", line_y__value_1);
    			}

    			if (!current || dirty & /*strokeWidth*/ 8) {
    				attr_dev(line, "stroke-width", /*strokeWidth*/ ctx[3]);
    			}

    			if (!current || dirty & /*strokeDasharray*/ 16) {
    				attr_dev(line, "stroke-dasharray", /*strokeDasharray*/ ctx[4]);
    			}

    			if (!current || dirty & /*opacity*/ 32) {
    				attr_dev(line, "opacity", /*opacity*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!line_transition) line_transition = create_bidirectional_transition(line, fade, {}, true);
    				line_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!line_transition) line_transition = create_bidirectional_transition(line, fade, {}, false);
    			line_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(line);
    			if (detaching && line_transition) line_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $regressionLineStore;
    	validate_store(regressionLineStore, 'regressionLineStore');
    	component_subscribe($$self, regressionLineStore, $$value => $$invalidate(6, $regressionLineStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RegressionLine', slots, []);
    	let { xScale } = $$props;
    	let { yScale } = $$props;
    	let { translate = 'translate(0,0)' } = $$props;
    	let { strokeWidth = 2 } = $$props;
    	let { strokeDasharray = '0' } = $$props;
    	let { opacity = 1 } = $$props;
    	const writable_props = ['xScale', 'yScale', 'translate', 'strokeWidth', 'strokeDasharray', 'opacity'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RegressionLine> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('translate' in $$props) $$invalidate(2, translate = $$props.translate);
    		if ('strokeWidth' in $$props) $$invalidate(3, strokeWidth = $$props.strokeWidth);
    		if ('strokeDasharray' in $$props) $$invalidate(4, strokeDasharray = $$props.strokeDasharray);
    		if ('opacity' in $$props) $$invalidate(5, opacity = $$props.opacity);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		regressionLineStore,
    		xScale,
    		yScale,
    		translate,
    		strokeWidth,
    		strokeDasharray,
    		opacity,
    		$regressionLineStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('translate' in $$props) $$invalidate(2, translate = $$props.translate);
    		if ('strokeWidth' in $$props) $$invalidate(3, strokeWidth = $$props.strokeWidth);
    		if ('strokeDasharray' in $$props) $$invalidate(4, strokeDasharray = $$props.strokeDasharray);
    		if ('opacity' in $$props) $$invalidate(5, opacity = $$props.opacity);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		xScale,
    		yScale,
    		translate,
    		strokeWidth,
    		strokeDasharray,
    		opacity,
    		$regressionLineStore
    	];
    }

    class RegressionLine extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			xScale: 0,
    			yScale: 1,
    			translate: 2,
    			strokeWidth: 3,
    			strokeDasharray: 4,
    			opacity: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RegressionLine",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*xScale*/ ctx[0] === undefined && !('xScale' in props)) {
    			console.warn("<RegressionLine> was created without expected prop 'xScale'");
    		}

    		if (/*yScale*/ ctx[1] === undefined && !('yScale' in props)) {
    			console.warn("<RegressionLine> was created without expected prop 'yScale'");
    		}
    	}

    	get xScale() {
    		throw new Error("<RegressionLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xScale(value) {
    		throw new Error("<RegressionLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get yScale() {
    		throw new Error("<RegressionLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set yScale(value) {
    		throw new Error("<RegressionLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translate() {
    		throw new Error("<RegressionLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translate(value) {
    		throw new Error("<RegressionLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get strokeWidth() {
    		throw new Error("<RegressionLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set strokeWidth(value) {
    		throw new Error("<RegressionLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get strokeDasharray() {
    		throw new Error("<RegressionLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set strokeDasharray(value) {
    		throw new Error("<RegressionLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get opacity() {
    		throw new Error("<RegressionLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set opacity(value) {
    		throw new Error("<RegressionLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/UserLine.svelte generated by Svelte v3.42.6 */
    const file$c = "src/components/UserLine.svelte";

    function create_fragment$c(ctx) {
    	let line;
    	let line_x__value;
    	let line_y__value;
    	let line_x__value_1;
    	let line_y__value_1;
    	let line_transition;
    	let t0;
    	let circle0;
    	let circle0_cx_value;
    	let circle0_cy_value;
    	let circle0_transition;
    	let t1;
    	let circle1;
    	let circle1_cx_value;
    	let circle1_cy_value;
    	let circle1_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			line = svg_element("line");
    			t0 = space();
    			circle0 = svg_element("circle");
    			t1 = space();
    			circle1 = svg_element("circle");
    			attr_dev(line, "x1", line_x__value = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x1));
    			attr_dev(line, "y1", line_y__value = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y1));
    			attr_dev(line, "x2", line_x__value_1 = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x2));
    			attr_dev(line, "y2", line_y__value_1 = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y2));
    			attr_dev(line, "class", "svelte-1rkymrg");
    			add_location(line, file$c, 41, 0, 907);
    			attr_dev(circle0, "id", "1");
    			attr_dev(circle0, "cx", circle0_cx_value = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x1));
    			attr_dev(circle0, "cy", circle0_cy_value = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y1));
    			attr_dev(circle0, "r", /*r*/ ctx[3]);
    			attr_dev(circle0, "class", "svelte-1rkymrg");
    			add_location(circle0, file$c, 48, 0, 1075);
    			attr_dev(circle1, "id", "2");
    			attr_dev(circle1, "cx", circle1_cx_value = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x2));
    			attr_dev(circle1, "cy", circle1_cy_value = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y2));
    			attr_dev(circle1, "r", /*r*/ ctx[3]);
    			attr_dev(circle1, "class", "svelte-1rkymrg");
    			add_location(circle1, file$c, 57, 0, 1236);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, line, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, circle0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, circle1, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*mousemove_handler*/ ctx[8], false, false, false),
    					listen_dev(window, "mouseup", /*mouseup_handler*/ ctx[9], false, false, false),
    					listen_dev(circle0, "mousedown", /*mousedown_handler*/ ctx[10], false, false, false),
    					listen_dev(circle1, "mousedown", /*mousedown_handler_1*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*xScale, $userLineStore*/ 5 && line_x__value !== (line_x__value = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x1))) {
    				attr_dev(line, "x1", line_x__value);
    			}

    			if (!current || dirty & /*yScale, $userLineStore*/ 6 && line_y__value !== (line_y__value = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y1))) {
    				attr_dev(line, "y1", line_y__value);
    			}

    			if (!current || dirty & /*xScale, $userLineStore*/ 5 && line_x__value_1 !== (line_x__value_1 = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x2))) {
    				attr_dev(line, "x2", line_x__value_1);
    			}

    			if (!current || dirty & /*yScale, $userLineStore*/ 6 && line_y__value_1 !== (line_y__value_1 = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y2))) {
    				attr_dev(line, "y2", line_y__value_1);
    			}

    			if (!current || dirty & /*xScale, $userLineStore*/ 5 && circle0_cx_value !== (circle0_cx_value = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x1))) {
    				attr_dev(circle0, "cx", circle0_cx_value);
    			}

    			if (!current || dirty & /*yScale, $userLineStore*/ 6 && circle0_cy_value !== (circle0_cy_value = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y1))) {
    				attr_dev(circle0, "cy", circle0_cy_value);
    			}

    			if (!current || dirty & /*xScale, $userLineStore*/ 5 && circle1_cx_value !== (circle1_cx_value = /*xScale*/ ctx[0](/*$userLineStore*/ ctx[2].x2))) {
    				attr_dev(circle1, "cx", circle1_cx_value);
    			}

    			if (!current || dirty & /*yScale, $userLineStore*/ 6 && circle1_cy_value !== (circle1_cy_value = /*yScale*/ ctx[1](/*$userLineStore*/ ctx[2].y2))) {
    				attr_dev(circle1, "cy", circle1_cy_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!line_transition) line_transition = create_bidirectional_transition(line, fade, {}, true);
    				line_transition.run(1);
    			});

    			add_render_callback(() => {
    				if (!circle0_transition) circle0_transition = create_bidirectional_transition(circle0, fade, {}, true);
    				circle0_transition.run(1);
    			});

    			add_render_callback(() => {
    				if (!circle1_transition) circle1_transition = create_bidirectional_transition(circle1, fade, {}, true);
    				circle1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!line_transition) line_transition = create_bidirectional_transition(line, fade, {}, false);
    			line_transition.run(0);
    			if (!circle0_transition) circle0_transition = create_bidirectional_transition(circle0, fade, {}, false);
    			circle0_transition.run(0);
    			if (!circle1_transition) circle1_transition = create_bidirectional_transition(circle1, fade, {}, false);
    			circle1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(line);
    			if (detaching && line_transition) line_transition.end();
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(circle0);
    			if (detaching && circle0_transition) circle0_transition.end();
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(circle1);
    			if (detaching && circle1_transition) circle1_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $userLineStore;
    	validate_store(userLineStore, 'userLineStore');
    	component_subscribe($$self, userLineStore, $$value => $$invalidate(2, $userLineStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('UserLine', slots, []);
    	let { xScale } = $$props;
    	let { yScale } = $$props;
    	let { svg } = $$props;
    	let r = 15;

    	// boolean for knowing when to move the handles during drag events
    	let dragging = false;

    	// keeps track of which handle shoudl be moved
    	let target;

    	// mouse event handlers
    	const handleMouseDown = event => {
    		dragging = true;
    		target = event.target.id;
    	};

    	const handleMouseMove = event => {
    		if (dragging) {
    			if (target === '1') {
    				set_store_value(userLineStore, $userLineStore.x1 = xScale.invert(event.offsetX), $userLineStore);
    				set_store_value(userLineStore, $userLineStore.y1 = yScale.invert(event.offsetY), $userLineStore);
    			} else if (target === '2') {
    				set_store_value(userLineStore, $userLineStore.x2 = xScale.invert(event.offsetX), $userLineStore);
    				set_store_value(userLineStore, $userLineStore.y2 = yScale.invert(event.offsetY), $userLineStore);
    			}
    		}
    	};

    	const handleMouseUp = event => {
    		dragging = false;
    	};

    	const writable_props = ['xScale', 'yScale', 'svg'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserLine> was created with unknown prop '${key}'`);
    	});

    	const mousemove_handler = e => handleMouseMove(e);
    	const mouseup_handler = e => handleMouseUp(e);
    	const mousedown_handler = e => handleMouseDown(e);
    	const mousedown_handler_1 = e => handleMouseDown(e);

    	$$self.$$set = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('svg' in $$props) $$invalidate(7, svg = $$props.svg);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		userLineStore,
    		fade,
    		xScale,
    		yScale,
    		svg,
    		r,
    		dragging,
    		target,
    		handleMouseDown,
    		handleMouseMove,
    		handleMouseUp,
    		$userLineStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('svg' in $$props) $$invalidate(7, svg = $$props.svg);
    		if ('r' in $$props) $$invalidate(3, r = $$props.r);
    		if ('dragging' in $$props) dragging = $$props.dragging;
    		if ('target' in $$props) target = $$props.target;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		xScale,
    		yScale,
    		$userLineStore,
    		r,
    		handleMouseDown,
    		handleMouseMove,
    		handleMouseUp,
    		svg,
    		mousemove_handler,
    		mouseup_handler,
    		mousedown_handler,
    		mousedown_handler_1
    	];
    }

    class UserLine extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { xScale: 0, yScale: 1, svg: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UserLine",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*xScale*/ ctx[0] === undefined && !('xScale' in props)) {
    			console.warn("<UserLine> was created without expected prop 'xScale'");
    		}

    		if (/*yScale*/ ctx[1] === undefined && !('yScale' in props)) {
    			console.warn("<UserLine> was created without expected prop 'yScale'");
    		}

    		if (/*svg*/ ctx[7] === undefined && !('svg' in props)) {
    			console.warn("<UserLine> was created without expected prop 'svg'");
    		}
    	}

    	get xScale() {
    		throw new Error("<UserLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xScale(value) {
    		throw new Error("<UserLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get yScale() {
    		throw new Error("<UserLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set yScale(value) {
    		throw new Error("<UserLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get svg() {
    		throw new Error("<UserLine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set svg(value) {
    		throw new Error("<UserLine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ResidualValues.svelte generated by Svelte v3.42.6 */
    const file$b = "src/components/ResidualValues.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (12:0) {#each resValues as residual, i}
    function create_each_block$4(ctx) {
    	let span;
    	let t_value = /*residual*/ ctx[6].toFixed(2) + "";
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "id", /*i*/ ctx[8]);
    			attr_dev(span, "class", "svelte-cfou56");
    			toggle_class(span, "highlighted", /*i*/ ctx[8] == /*highlightId*/ ctx[0]);
    			add_location(span, file$b, 12, 4, 343);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*resValues*/ 2 && t_value !== (t_value = /*residual*/ ctx[6].toFixed(2) + "")) set_data_dev(t, t_value);

    			if (dirty & /*highlightId*/ 1) {
    				toggle_class(span, "highlighted", /*i*/ ctx[8] == /*highlightId*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(12:0) {#each resValues as residual, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let t0;
    	let span;
    	let t1_value = /*ssr*/ ctx[2].toFixed(2) + "";
    	let t1;
    	let each_value = /*resValues*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			attr_dev(span, "class", "ssr svelte-cfou56");
    			add_location(span, file$b, 20, 0, 489);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*highlightId, resValues*/ 3) {
    				each_value = /*resValues*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*ssr*/ 4 && t1_value !== (t1_value = /*ssr*/ ctx[2].toFixed(2) + "")) set_data_dev(t1, t1_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let resValues;
    	let ssr;
    	let $member;
    	validate_store(member, 'member');
    	component_subscribe($$self, member, $$value => $$invalidate(4, $member = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ResidualValues', slots, []);
    	let { predict } = $$props;
    	let { highlightId } = $$props;
    	const writable_props = ['predict', 'highlightId'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ResidualValues> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('predict' in $$props) $$invalidate(3, predict = $$props.predict);
    		if ('highlightId' in $$props) $$invalidate(0, highlightId = $$props.highlightId);
    	};

    	$$self.$capture_state = () => ({
    		points,
    		member,
    		predict,
    		highlightId,
    		resValues,
    		ssr,
    		$member
    	});

    	$$self.$inject_state = $$props => {
    		if ('predict' in $$props) $$invalidate(3, predict = $$props.predict);
    		if ('highlightId' in $$props) $$invalidate(0, highlightId = $$props.highlightId);
    		if ('resValues' in $$props) $$invalidate(1, resValues = $$props.resValues);
    		if ('ssr' in $$props) $$invalidate(2, ssr = $$props.ssr);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$member, predict*/ 24) {
    			$$invalidate(1, resValues = points[$member].map(point => Math.pow(point.y - predict(point.x), 2)));
    		}

    		if ($$self.$$.dirty & /*resValues*/ 2) {
    			$$invalidate(2, ssr = resValues.reduce((previous, current) => previous + current));
    		}
    	};

    	return [highlightId, resValues, ssr, predict, $member, click_handler];
    }

    class ResidualValues extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { predict: 3, highlightId: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ResidualValues",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*predict*/ ctx[3] === undefined && !('predict' in props)) {
    			console.warn("<ResidualValues> was created without expected prop 'predict'");
    		}

    		if (/*highlightId*/ ctx[0] === undefined && !('highlightId' in props)) {
    			console.warn("<ResidualValues> was created without expected prop 'highlightId'");
    		}
    	}

    	get predict() {
    		throw new Error("<ResidualValues>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set predict(value) {
    		throw new Error("<ResidualValues>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlightId() {
    		throw new Error("<ResidualValues>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightId(value) {
    		throw new Error("<ResidualValues>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/shared/Card.svelte generated by Svelte v3.42.6 */

    const file$a = "src/shared/Card.svelte";

    function create_fragment$a(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "card svelte-11im8te");
    			add_location(div, file$a, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Card', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/shared/Switch.svelte generated by Svelte v3.42.6 */

    const file$9 = "src/shared/Switch.svelte";

    function create_fragment$9(ctx) {
    	let label;
    	let input;
    	let t;
    	let span;
    	let span_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t = space();
    			span = element("span");
    			attr_dev(input, "type", "checkbox");
    			input.disabled = /*disabled*/ ctx[1];
    			attr_dev(input, "class", "svelte-hehk26");
    			add_location(input, file$9, 9, 4, 148);
    			attr_dev(span, "class", span_class_value = "slider " + /*color*/ ctx[2] + " svelte-hehk26");
    			toggle_class(span, "disabled", /*disabled*/ ctx[1]);
    			add_location(span, file$9, 10, 4, 219);
    			attr_dev(label, "class", "switch svelte-hehk26");
    			add_location(label, file$9, 8, 0, 121);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = /*checked*/ ctx[0];
    			append_dev(label, t);
    			append_dev(label, span);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[3]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*disabled*/ 2) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[1]);
    			}

    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (dirty & /*color*/ 4 && span_class_value !== (span_class_value = "slider " + /*color*/ ctx[2] + " svelte-hehk26")) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (dirty & /*color, disabled*/ 6) {
    				toggle_class(span, "disabled", /*disabled*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Switch', slots, []);
    	let { checked = false } = $$props;
    	let { disabled = false } = $$props;
    	let { color = 'primary' } = $$props;
    	const writable_props = ['checked', 'disabled', 'color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Switch> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	$$self.$$set = $$props => {
    		if ('checked' in $$props) $$invalidate(0, checked = $$props.checked);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ checked, disabled, color });

    	$$self.$inject_state = $$props => {
    		if ('checked' in $$props) $$invalidate(0, checked = $$props.checked);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [checked, disabled, color, input_change_handler];
    }

    class Switch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { checked: 0, disabled: 1, color: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Switch",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get checked() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Control.svelte generated by Svelte v3.42.6 */
    const file$8 = "src/components/Control.svelte";

    // (34:4) {#if lineChecked}
    function create_if_block_1$3(ctx) {
    	let span;
    	let t0;
    	let strong0;
    	let t1_value = /*slope*/ ctx[4].toFixed(2) + "";
    	let t1;
    	let t2;
    	let strong1;
    	let t3_value = /*yInt*/ ctx[5].toFixed(2) + "";
    	let t3;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("y = ");
    			strong0 = element("strong");
    			t1 = text(t1_value);
    			t2 = text("x + ");
    			strong1 = element("strong");
    			t3 = text(t3_value);
    			attr_dev(strong0, "class", "svelte-1bak9wu");
    			add_location(strong0, file$8, 34, 48, 766);
    			attr_dev(strong1, "class", "svelte-1bak9wu");
    			add_location(strong1, file$8, 34, 87, 805);
    			attr_dev(span, "id", "lineFormula");
    			attr_dev(span, "class", span_class_value = "" + (null_to_empty(/*color*/ ctx[2]) + " svelte-1bak9wu"));
    			add_location(span, file$8, 34, 6, 724);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, strong0);
    			append_dev(strong0, t1);
    			append_dev(span, t2);
    			append_dev(span, strong1);
    			append_dev(strong1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*slope*/ 16 && t1_value !== (t1_value = /*slope*/ ctx[4].toFixed(2) + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*yInt*/ 32 && t3_value !== (t3_value = /*yInt*/ ctx[5].toFixed(2) + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*color*/ 4 && span_class_value !== (span_class_value = "" + (null_to_empty(/*color*/ ctx[2]) + " svelte-1bak9wu"))) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(34:4) {#if lineChecked}",
    		ctx
    	});

    	return block;
    }

    // (39:2) {#if showResidualControls}
    function create_if_block$4(ctx) {
    	let section;
    	let switch_1;
    	let updating_checked;
    	let t0;
    	let span;
    	let current;

    	function switch_1_checked_binding_1(value) {
    		/*switch_1_checked_binding_1*/ ctx[10](value);
    	}

    	let switch_1_props = {
    		disabled: !/*lineChecked*/ ctx[0],
    		color: /*color*/ ctx[2]
    	};

    	if (/*resChecked*/ ctx[1] !== void 0) {
    		switch_1_props.checked = /*resChecked*/ ctx[1];
    	}

    	switch_1 = new Switch({ props: switch_1_props, $$inline: true });
    	binding_callbacks.push(() => bind(switch_1, 'checked', switch_1_checked_binding_1));

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(switch_1.$$.fragment);
    			t0 = space();
    			span = element("span");
    			span.textContent = "Residuals";
    			attr_dev(span, "class", "title svelte-1bak9wu");
    			add_location(span, file$8, 42, 6, 1021);
    			attr_dev(section, "class", "resControls svelte-1bak9wu");
    			add_location(section, file$8, 39, 2, 905);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(switch_1, section, null);
    			append_dev(section, t0);
    			append_dev(section, span);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_1_changes = {};
    			if (dirty & /*lineChecked*/ 1) switch_1_changes.disabled = !/*lineChecked*/ ctx[0];
    			if (dirty & /*color*/ 4) switch_1_changes.color = /*color*/ ctx[2];

    			if (!updating_checked && dirty & /*resChecked*/ 2) {
    				updating_checked = true;
    				switch_1_changes.checked = /*resChecked*/ ctx[1];
    				add_flush_callback(() => updating_checked = false);
    			}

    			switch_1.$set(switch_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(switch_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(switch_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(switch_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(39:2) {#if showResidualControls}",
    		ctx
    	});

    	return block;
    }

    // (27:0) <Card>
    function create_default_slot$3(ctx) {
    	let section;
    	let switch_1;
    	let updating_checked;
    	let t0;
    	let span;
    	let t1;
    	let t2;
    	let if_block1_anchor;
    	let current;

    	function switch_1_checked_binding(value) {
    		/*switch_1_checked_binding*/ ctx[9](value);
    	}

    	let switch_1_props = { color: /*color*/ ctx[2] };

    	if (/*lineChecked*/ ctx[0] !== void 0) {
    		switch_1_props.checked = /*lineChecked*/ ctx[0];
    	}

    	switch_1 = new Switch({ props: switch_1_props, $$inline: true });
    	binding_callbacks.push(() => bind(switch_1, 'checked', switch_1_checked_binding));
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);
    	let if_block0 = /*lineChecked*/ ctx[0] && create_if_block_1$3(ctx);
    	let if_block1 = /*showResidualControls*/ ctx[3] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			create_component(switch_1.$$.fragment);
    			t0 = space();
    			span = element("span");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(span, "class", "title svelte-1bak9wu");
    			add_location(span, file$8, 29, 4, 642);
    			attr_dev(section, "class", "lineControls svelte-1bak9wu");
    			add_location(section, file$8, 27, 2, 558);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			mount_component(switch_1, section, null);
    			append_dev(section, t0);
    			append_dev(section, span);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			append_dev(section, t1);
    			if (if_block0) if_block0.m(section, null);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_1_changes = {};
    			if (dirty & /*color*/ 4) switch_1_changes.color = /*color*/ ctx[2];

    			if (!updating_checked && dirty & /*lineChecked*/ 1) {
    				updating_checked = true;
    				switch_1_changes.checked = /*lineChecked*/ ctx[0];
    				add_flush_callback(() => updating_checked = false);
    			}

    			switch_1.$set(switch_1_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*lineChecked*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
    					if_block0.c();
    					if_block0.m(section, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*showResidualControls*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*showResidualControls*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(switch_1.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(switch_1.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(switch_1);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block0) if_block0.d();
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(27:0) <Card>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const card_changes = {};

    			if (dirty & /*$$scope, lineChecked, color, resChecked, showResidualControls, yInt, slope*/ 2111) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Control', slots, ['default']);
    	let { showResValues } = $$props;
    	let { color = 'primary' } = $$props;
    	let { id = '' } = $$props;
    	let { showResidualControls = false } = $$props;
    	let { slope = 1 } = $$props;
    	let { yInt = 0 } = $$props;
    	let { lineChecked = false } = $$props;
    	let { resChecked = false } = $$props;
    	let resDisabled = false;

    	const writable_props = [
    		'showResValues',
    		'color',
    		'id',
    		'showResidualControls',
    		'slope',
    		'yInt',
    		'lineChecked',
    		'resChecked'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Control> was created with unknown prop '${key}'`);
    	});

    	function switch_1_checked_binding(value) {
    		lineChecked = value;
    		$$invalidate(0, lineChecked);
    	}

    	function switch_1_checked_binding_1(value) {
    		resChecked = value;
    		($$invalidate(1, resChecked), $$invalidate(0, lineChecked));
    	}

    	$$self.$$set = $$props => {
    		if ('showResValues' in $$props) $$invalidate(6, showResValues = $$props.showResValues);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('id' in $$props) $$invalidate(7, id = $$props.id);
    		if ('showResidualControls' in $$props) $$invalidate(3, showResidualControls = $$props.showResidualControls);
    		if ('slope' in $$props) $$invalidate(4, slope = $$props.slope);
    		if ('yInt' in $$props) $$invalidate(5, yInt = $$props.yInt);
    		if ('lineChecked' in $$props) $$invalidate(0, lineChecked = $$props.lineChecked);
    		if ('resChecked' in $$props) $$invalidate(1, resChecked = $$props.resChecked);
    		if ('$$scope' in $$props) $$invalidate(11, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		fly,
    		ResidualValues,
    		Card,
    		Switch,
    		showResValues,
    		color,
    		id,
    		showResidualControls,
    		slope,
    		yInt,
    		lineChecked,
    		resChecked,
    		resDisabled
    	});

    	$$self.$inject_state = $$props => {
    		if ('showResValues' in $$props) $$invalidate(6, showResValues = $$props.showResValues);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('id' in $$props) $$invalidate(7, id = $$props.id);
    		if ('showResidualControls' in $$props) $$invalidate(3, showResidualControls = $$props.showResidualControls);
    		if ('slope' in $$props) $$invalidate(4, slope = $$props.slope);
    		if ('yInt' in $$props) $$invalidate(5, yInt = $$props.yInt);
    		if ('lineChecked' in $$props) $$invalidate(0, lineChecked = $$props.lineChecked);
    		if ('resChecked' in $$props) $$invalidate(1, resChecked = $$props.resChecked);
    		if ('resDisabled' in $$props) resDisabled = $$props.resDisabled;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*lineChecked*/ 1) {
    			if (!lineChecked) {
    				$$invalidate(1, resChecked = false);
    			}
    		}
    	};

    	return [
    		lineChecked,
    		resChecked,
    		color,
    		showResidualControls,
    		slope,
    		yInt,
    		showResValues,
    		id,
    		slots,
    		switch_1_checked_binding,
    		switch_1_checked_binding_1,
    		$$scope
    	];
    }

    class Control extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			showResValues: 6,
    			color: 2,
    			id: 7,
    			showResidualControls: 3,
    			slope: 4,
    			yInt: 5,
    			lineChecked: 0,
    			resChecked: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Control",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*showResValues*/ ctx[6] === undefined && !('showResValues' in props)) {
    			console.warn("<Control> was created without expected prop 'showResValues'");
    		}
    	}

    	get showResValues() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showResValues(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showResidualControls() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showResidualControls(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get slope() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slope(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get yInt() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set yInt(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lineChecked() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lineChecked(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get resChecked() {
    		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set resChecked(value) {
    		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Residuals.svelte generated by Svelte v3.42.6 */

    const file$7 = "src/components/Residuals.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i].x;
    	child_ctx[9] = list[i].y;
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (16:4) {#each points as {x, y}
    function create_each_block$3(ctx) {
    	let line;
    	let line_x__value;
    	let line_y__value;
    	let line_x__value_1;
    	let line_y__value_1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			line = svg_element("line");
    			attr_dev(line, "x1", line_x__value = /*xScale*/ ctx[0](/*x*/ ctx[8]));
    			attr_dev(line, "y1", line_y__value = /*yScale*/ ctx[1](/*y*/ ctx[9]));
    			attr_dev(line, "x2", line_x__value_1 = /*xScale*/ ctx[0](/*x*/ ctx[8]));
    			attr_dev(line, "y2", line_y__value_1 = /*yScale*/ ctx[1](/*predict*/ ctx[4](/*x*/ ctx[8])));
    			attr_dev(line, "id", /*i*/ ctx[11]);
    			attr_dev(line, "class", "svelte-zsth8g");
    			toggle_class(line, "highlighted", /*i*/ ctx[11] == /*highlightId*/ ctx[5]);
    			toggle_class(line, "translated", /*translating*/ ctx[6]);
    			add_location(line, file$7, 16, 8, 268);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, line, anchor);

    			if (!mounted) {
    				dispose = listen_dev(line, "click", /*click_handler*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*xScale, points*/ 9 && line_x__value !== (line_x__value = /*xScale*/ ctx[0](/*x*/ ctx[8]))) {
    				attr_dev(line, "x1", line_x__value);
    			}

    			if (dirty & /*yScale, points*/ 10 && line_y__value !== (line_y__value = /*yScale*/ ctx[1](/*y*/ ctx[9]))) {
    				attr_dev(line, "y1", line_y__value);
    			}

    			if (dirty & /*xScale, points*/ 9 && line_x__value_1 !== (line_x__value_1 = /*xScale*/ ctx[0](/*x*/ ctx[8]))) {
    				attr_dev(line, "x2", line_x__value_1);
    			}

    			if (dirty & /*yScale, predict, points*/ 26 && line_y__value_1 !== (line_y__value_1 = /*yScale*/ ctx[1](/*predict*/ ctx[4](/*x*/ ctx[8])))) {
    				attr_dev(line, "y2", line_y__value_1);
    			}

    			if (dirty & /*highlightId*/ 32) {
    				toggle_class(line, "highlighted", /*i*/ ctx[11] == /*highlightId*/ ctx[5]);
    			}

    			if (dirty & /*translating*/ 64) {
    				toggle_class(line, "translated", /*translating*/ ctx[6]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(line);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(16:4) {#each points as {x, y}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let g;
    	let each_value = /*points*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			g = svg_element("g");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(g, "id", /*groupId*/ ctx[2]);
    			attr_dev(g, "class", "svelte-zsth8g");
    			add_location(g, file$7, 14, 0, 211);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(g, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*xScale, points, yScale, predict, highlightId, translating*/ 123) {
    				each_value = /*points*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(g, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*groupId*/ 4) {
    				attr_dev(g, "id", /*groupId*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Residuals', slots, []);
    	let { xScale } = $$props;
    	let { yScale } = $$props;
    	let { groupId = '' } = $$props;
    	let { points = [] } = $$props;
    	let { predict } = $$props;
    	let { highlightId } = $$props;
    	let { translating } = $$props;

    	const writable_props = [
    		'xScale',
    		'yScale',
    		'groupId',
    		'points',
    		'predict',
    		'highlightId',
    		'translating'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Residuals> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('groupId' in $$props) $$invalidate(2, groupId = $$props.groupId);
    		if ('points' in $$props) $$invalidate(3, points = $$props.points);
    		if ('predict' in $$props) $$invalidate(4, predict = $$props.predict);
    		if ('highlightId' in $$props) $$invalidate(5, highlightId = $$props.highlightId);
    		if ('translating' in $$props) $$invalidate(6, translating = $$props.translating);
    	};

    	$$self.$capture_state = () => ({
    		xScale,
    		yScale,
    		groupId,
    		points,
    		predict,
    		highlightId,
    		translating
    	});

    	$$self.$inject_state = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('groupId' in $$props) $$invalidate(2, groupId = $$props.groupId);
    		if ('points' in $$props) $$invalidate(3, points = $$props.points);
    		if ('predict' in $$props) $$invalidate(4, predict = $$props.predict);
    		if ('highlightId' in $$props) $$invalidate(5, highlightId = $$props.highlightId);
    		if ('translating' in $$props) $$invalidate(6, translating = $$props.translating);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		xScale,
    		yScale,
    		groupId,
    		points,
    		predict,
    		highlightId,
    		translating,
    		click_handler
    	];
    }

    class Residuals extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			xScale: 0,
    			yScale: 1,
    			groupId: 2,
    			points: 3,
    			predict: 4,
    			highlightId: 5,
    			translating: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Residuals",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*xScale*/ ctx[0] === undefined && !('xScale' in props)) {
    			console.warn("<Residuals> was created without expected prop 'xScale'");
    		}

    		if (/*yScale*/ ctx[1] === undefined && !('yScale' in props)) {
    			console.warn("<Residuals> was created without expected prop 'yScale'");
    		}

    		if (/*predict*/ ctx[4] === undefined && !('predict' in props)) {
    			console.warn("<Residuals> was created without expected prop 'predict'");
    		}

    		if (/*highlightId*/ ctx[5] === undefined && !('highlightId' in props)) {
    			console.warn("<Residuals> was created without expected prop 'highlightId'");
    		}

    		if (/*translating*/ ctx[6] === undefined && !('translating' in props)) {
    			console.warn("<Residuals> was created without expected prop 'translating'");
    		}
    	}

    	get xScale() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xScale(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get yScale() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set yScale(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get groupId() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set groupId(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get points() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set points(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get predict() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set predict(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlightId() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightId(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translating() {
    		throw new Error("<Residuals>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translating(value) {
    		throw new Error("<Residuals>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/SingleResidual.svelte generated by Svelte v3.42.6 */

    const file$6 = "src/components/SingleResidual.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i].x;
    	child_ctx[10] = list[i].y;
    	child_ctx[12] = i;
    	return child_ctx;
    }

    // (21:4) {#each points as {x, y}
    function create_each_block$2(ctx) {
    	let line;
    	let line_x__value;
    	let line_y__value;
    	let line_x__value_1;
    	let line_y__value_1;
    	let text_1;
    	let t_value = (/*y*/ ctx[10] - /*predict*/ ctx[3](/*x*/ ctx[9])).toFixed(2) + "";
    	let t;
    	let text_1_x_value;
    	let text_1_y_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			line = svg_element("line");
    			text_1 = svg_element("text");
    			t = text(t_value);
    			attr_dev(line, "id", /*i*/ ctx[12]);
    			attr_dev(line, "x1", line_x__value = /*xScale*/ ctx[0](/*x*/ ctx[9]));
    			attr_dev(line, "y1", line_y__value = /*yScale*/ ctx[1](/*y*/ ctx[10]));
    			attr_dev(line, "x2", line_x__value_1 = /*xScale*/ ctx[0](/*x*/ ctx[9]));
    			attr_dev(line, "y2", line_y__value_1 = /*yScale*/ ctx[1](/*predict*/ ctx[3](/*x*/ ctx[9])));
    			attr_dev(line, "class", "svelte-z6l7mu");
    			toggle_class(line, "translated", /*translating*/ ctx[5]);
    			toggle_class(line, "hidden", /*i*/ ctx[12] != /*highlightId*/ ctx[4]);
    			add_location(line, file$6, 21, 8, 350);
    			attr_dev(text_1, "id", /*i*/ ctx[12]);
    			attr_dev(text_1, "text-anchor", "middle");
    			attr_dev(text_1, "x", text_1_x_value = /*xScale*/ ctx[0](/*x*/ ctx[9]) + /*offset*/ ctx[7]);
    			attr_dev(text_1, "y", text_1_y_value = /*yScale*/ ctx[1]((/*y*/ ctx[10] + /*predict*/ ctx[3](/*x*/ ctx[9])) / 2));
    			attr_dev(text_1, "class", "svelte-z6l7mu");
    			toggle_class(text_1, "translated", /*translating*/ ctx[5]);
    			toggle_class(text_1, "hidden", /*i*/ ctx[12] != /*highlightId*/ ctx[4]);
    			add_location(text_1, file$6, 32, 8, 634);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, line, anchor);
    			insert_dev(target, text_1, anchor);
    			append_dev(text_1, t);

    			if (!mounted) {
    				dispose = listen_dev(line, "click", /*click_handler*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*xScale, points*/ 65 && line_x__value !== (line_x__value = /*xScale*/ ctx[0](/*x*/ ctx[9]))) {
    				attr_dev(line, "x1", line_x__value);
    			}

    			if (dirty & /*yScale, points*/ 66 && line_y__value !== (line_y__value = /*yScale*/ ctx[1](/*y*/ ctx[10]))) {
    				attr_dev(line, "y1", line_y__value);
    			}

    			if (dirty & /*xScale, points*/ 65 && line_x__value_1 !== (line_x__value_1 = /*xScale*/ ctx[0](/*x*/ ctx[9]))) {
    				attr_dev(line, "x2", line_x__value_1);
    			}

    			if (dirty & /*yScale, predict, points*/ 74 && line_y__value_1 !== (line_y__value_1 = /*yScale*/ ctx[1](/*predict*/ ctx[3](/*x*/ ctx[9])))) {
    				attr_dev(line, "y2", line_y__value_1);
    			}

    			if (dirty & /*translating*/ 32) {
    				toggle_class(line, "translated", /*translating*/ ctx[5]);
    			}

    			if (dirty & /*highlightId*/ 16) {
    				toggle_class(line, "hidden", /*i*/ ctx[12] != /*highlightId*/ ctx[4]);
    			}

    			if (dirty & /*points, predict*/ 72 && t_value !== (t_value = (/*y*/ ctx[10] - /*predict*/ ctx[3](/*x*/ ctx[9])).toFixed(2) + "")) set_data_dev(t, t_value);

    			if (dirty & /*xScale, points, offset*/ 193 && text_1_x_value !== (text_1_x_value = /*xScale*/ ctx[0](/*x*/ ctx[9]) + /*offset*/ ctx[7])) {
    				attr_dev(text_1, "x", text_1_x_value);
    			}

    			if (dirty & /*yScale, points, predict*/ 74 && text_1_y_value !== (text_1_y_value = /*yScale*/ ctx[1]((/*y*/ ctx[10] + /*predict*/ ctx[3](/*x*/ ctx[9])) / 2))) {
    				attr_dev(text_1, "y", text_1_y_value);
    			}

    			if (dirty & /*translating*/ 32) {
    				toggle_class(text_1, "translated", /*translating*/ ctx[5]);
    			}

    			if (dirty & /*highlightId*/ 16) {
    				toggle_class(text_1, "hidden", /*i*/ ctx[12] != /*highlightId*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(line);
    			if (detaching) detach_dev(text_1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(21:4) {#each points as {x, y}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let g;
    	let each_value = /*points*/ ctx[6];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			g = svg_element("g");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(g, "id", /*groupId*/ ctx[2]);
    			attr_dev(g, "class", "svelte-z6l7mu");
    			add_location(g, file$6, 19, 0, 293);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(g, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*xScale, points, offset, yScale, predict, translating, highlightId*/ 251) {
    				each_value = /*points*/ ctx[6];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(g, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*groupId*/ 4) {
    				attr_dev(g, "id", /*groupId*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SingleResidual', slots, []);
    	let { xScale } = $$props;
    	let { yScale } = $$props;
    	let { groupId } = $$props;
    	let { predict } = $$props;
    	let { highlightId } = $$props;
    	let { translating } = $$props;
    	let { points } = $$props;
    	let offset = 25;

    	const writable_props = [
    		'xScale',
    		'yScale',
    		'groupId',
    		'predict',
    		'highlightId',
    		'translating',
    		'points'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SingleResidual> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('groupId' in $$props) $$invalidate(2, groupId = $$props.groupId);
    		if ('predict' in $$props) $$invalidate(3, predict = $$props.predict);
    		if ('highlightId' in $$props) $$invalidate(4, highlightId = $$props.highlightId);
    		if ('translating' in $$props) $$invalidate(5, translating = $$props.translating);
    		if ('points' in $$props) $$invalidate(6, points = $$props.points);
    	};

    	$$self.$capture_state = () => ({
    		xScale,
    		yScale,
    		groupId,
    		predict,
    		highlightId,
    		translating,
    		points,
    		offset
    	});

    	$$self.$inject_state = $$props => {
    		if ('xScale' in $$props) $$invalidate(0, xScale = $$props.xScale);
    		if ('yScale' in $$props) $$invalidate(1, yScale = $$props.yScale);
    		if ('groupId' in $$props) $$invalidate(2, groupId = $$props.groupId);
    		if ('predict' in $$props) $$invalidate(3, predict = $$props.predict);
    		if ('highlightId' in $$props) $$invalidate(4, highlightId = $$props.highlightId);
    		if ('translating' in $$props) $$invalidate(5, translating = $$props.translating);
    		if ('points' in $$props) $$invalidate(6, points = $$props.points);
    		if ('offset' in $$props) $$invalidate(7, offset = $$props.offset);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*groupId, offset*/ 132) {
    			if (groupId === 'userLineResidual') {
    				$$invalidate(7, offset *= -1);
    			}
    		}
    	};

    	return [
    		xScale,
    		yScale,
    		groupId,
    		predict,
    		highlightId,
    		translating,
    		points,
    		offset,
    		click_handler
    	];
    }

    class SingleResidual extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			xScale: 0,
    			yScale: 1,
    			groupId: 2,
    			predict: 3,
    			highlightId: 4,
    			translating: 5,
    			points: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SingleResidual",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*xScale*/ ctx[0] === undefined && !('xScale' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'xScale'");
    		}

    		if (/*yScale*/ ctx[1] === undefined && !('yScale' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'yScale'");
    		}

    		if (/*groupId*/ ctx[2] === undefined && !('groupId' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'groupId'");
    		}

    		if (/*predict*/ ctx[3] === undefined && !('predict' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'predict'");
    		}

    		if (/*highlightId*/ ctx[4] === undefined && !('highlightId' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'highlightId'");
    		}

    		if (/*translating*/ ctx[5] === undefined && !('translating' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'translating'");
    		}

    		if (/*points*/ ctx[6] === undefined && !('points' in props)) {
    			console.warn("<SingleResidual> was created without expected prop 'points'");
    		}
    	}

    	get xScale() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xScale(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get yScale() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set yScale(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get groupId() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set groupId(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get predict() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set predict(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlightId() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightId(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translating() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translating(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get points() {
    		throw new Error("<SingleResidual>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set points(value) {
    		throw new Error("<SingleResidual>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ResidualsTable.svelte generated by Svelte v3.42.6 */
    const file$5 = "src/components/ResidualsTable.svelte";

    // (26:6) {#if showUserResiduals}
    function create_if_block_1$2(ctx) {
    	let residualvalues;
    	let current;

    	residualvalues = new ResidualValues({
    			props: {
    				highlightId: /*highlightId*/ ctx[0],
    				predict: /*userLinePredict*/ ctx[3]
    			},
    			$$inline: true
    		});

    	residualvalues.$on("click", /*click_handler*/ ctx[5]);

    	const block = {
    		c: function create() {
    			create_component(residualvalues.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(residualvalues, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const residualvalues_changes = {};
    			if (dirty & /*highlightId*/ 1) residualvalues_changes.highlightId = /*highlightId*/ ctx[0];
    			if (dirty & /*userLinePredict*/ 8) residualvalues_changes.predict = /*userLinePredict*/ ctx[3];
    			residualvalues.$set(residualvalues_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(residualvalues.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(residualvalues.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(residualvalues, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(26:6) {#if showUserResiduals}",
    		ctx
    	});

    	return block;
    }

    // (32:6) {#if showRegressionResiduals}
    function create_if_block$3(ctx) {
    	let residualvalues;
    	let current;

    	residualvalues = new ResidualValues({
    			props: {
    				highlightId: /*highlightId*/ ctx[0],
    				predict: /*bestFitLinePredict*/ ctx[4]
    			},
    			$$inline: true
    		});

    	residualvalues.$on("click", /*click_handler_1*/ ctx[6]);

    	const block = {
    		c: function create() {
    			create_component(residualvalues.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(residualvalues, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const residualvalues_changes = {};
    			if (dirty & /*highlightId*/ 1) residualvalues_changes.highlightId = /*highlightId*/ ctx[0];
    			if (dirty & /*bestFitLinePredict*/ 16) residualvalues_changes.predict = /*bestFitLinePredict*/ ctx[4];
    			residualvalues.$set(residualvalues_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(residualvalues.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(residualvalues.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(residualvalues, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(32:6) {#if showRegressionResiduals}",
    		ctx
    	});

    	return block;
    }

    // (21:0) <Card>
    function create_default_slot$2(ctx) {
    	let div0;
    	let span0;
    	let t1;
    	let span1;
    	let strong;
    	let t3;
    	let div1;
    	let t4;
    	let div2;
    	let current;
    	let if_block0 = /*showUserResiduals*/ ctx[2] && create_if_block_1$2(ctx);
    	let if_block1 = /*showRegressionResiduals*/ ctx[1] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Squared Residuals";
    			t1 = space();
    			span1 = element("span");
    			strong = element("strong");
    			strong.textContent = "SSR";
    			t3 = space();
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t4 = space();
    			div2 = element("div");
    			if (if_block1) if_block1.c();
    			add_location(span0, file$5, 22, 6, 496);
    			add_location(strong, file$5, 23, 10, 538);
    			add_location(span1, file$5, 23, 4, 532);
    			attr_dev(div0, "class", "title svelte-1dspyky");
    			add_location(div0, file$5, 21, 4, 470);
    			attr_dev(div1, "id", "user");
    			attr_dev(div1, "class", "residualsRow svelte-1dspyky");
    			add_location(div1, file$5, 24, 4, 576);
    			attr_dev(div2, "id", "regression");
    			attr_dev(div2, "class", "residualsRow svelte-1dspyky");
    			add_location(div2, file$5, 30, 4, 748);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(span1, strong);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div2, anchor);
    			if (if_block1) if_block1.m(div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*showUserResiduals*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*showUserResiduals*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div1, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*showRegressionResiduals*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*showRegressionResiduals*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div2, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div2);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(21:0) <Card>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const card_changes = {};

    			if (dirty & /*$$scope, highlightId, bestFitLinePredict, showRegressionResiduals, userLinePredict, showUserResiduals*/ 159) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ResidualsTable', slots, []);
    	let { highlightId } = $$props;
    	let { showRegressionResiduals } = $$props;
    	let { showUserResiduals } = $$props;
    	let { userLinePredict } = $$props;
    	let { bestFitLinePredict } = $$props;

    	const writable_props = [
    		'highlightId',
    		'showRegressionResiduals',
    		'showUserResiduals',
    		'userLinePredict',
    		'bestFitLinePredict'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ResidualsTable> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('highlightId' in $$props) $$invalidate(0, highlightId = $$props.highlightId);
    		if ('showRegressionResiduals' in $$props) $$invalidate(1, showRegressionResiduals = $$props.showRegressionResiduals);
    		if ('showUserResiduals' in $$props) $$invalidate(2, showUserResiduals = $$props.showUserResiduals);
    		if ('userLinePredict' in $$props) $$invalidate(3, userLinePredict = $$props.userLinePredict);
    		if ('bestFitLinePredict' in $$props) $$invalidate(4, bestFitLinePredict = $$props.bestFitLinePredict);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		fade,
    		points,
    		member,
    		ResidualValues,
    		Card,
    		Switch,
    		highlightId,
    		showRegressionResiduals,
    		showUserResiduals,
    		userLinePredict,
    		bestFitLinePredict
    	});

    	$$self.$inject_state = $$props => {
    		if ('highlightId' in $$props) $$invalidate(0, highlightId = $$props.highlightId);
    		if ('showRegressionResiduals' in $$props) $$invalidate(1, showRegressionResiduals = $$props.showRegressionResiduals);
    		if ('showUserResiduals' in $$props) $$invalidate(2, showUserResiduals = $$props.showUserResiduals);
    		if ('userLinePredict' in $$props) $$invalidate(3, userLinePredict = $$props.userLinePredict);
    		if ('bestFitLinePredict' in $$props) $$invalidate(4, bestFitLinePredict = $$props.bestFitLinePredict);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		highlightId,
    		showRegressionResiduals,
    		showUserResiduals,
    		userLinePredict,
    		bestFitLinePredict,
    		click_handler,
    		click_handler_1
    	];
    }

    class ResidualsTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			highlightId: 0,
    			showRegressionResiduals: 1,
    			showUserResiduals: 2,
    			userLinePredict: 3,
    			bestFitLinePredict: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ResidualsTable",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*highlightId*/ ctx[0] === undefined && !('highlightId' in props)) {
    			console.warn("<ResidualsTable> was created without expected prop 'highlightId'");
    		}

    		if (/*showRegressionResiduals*/ ctx[1] === undefined && !('showRegressionResiduals' in props)) {
    			console.warn("<ResidualsTable> was created without expected prop 'showRegressionResiduals'");
    		}

    		if (/*showUserResiduals*/ ctx[2] === undefined && !('showUserResiduals' in props)) {
    			console.warn("<ResidualsTable> was created without expected prop 'showUserResiduals'");
    		}

    		if (/*userLinePredict*/ ctx[3] === undefined && !('userLinePredict' in props)) {
    			console.warn("<ResidualsTable> was created without expected prop 'userLinePredict'");
    		}

    		if (/*bestFitLinePredict*/ ctx[4] === undefined && !('bestFitLinePredict' in props)) {
    			console.warn("<ResidualsTable> was created without expected prop 'bestFitLinePredict'");
    		}
    	}

    	get highlightId() {
    		throw new Error("<ResidualsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlightId(value) {
    		throw new Error("<ResidualsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showRegressionResiduals() {
    		throw new Error("<ResidualsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showRegressionResiduals(value) {
    		throw new Error("<ResidualsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showUserResiduals() {
    		throw new Error("<ResidualsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showUserResiduals(value) {
    		throw new Error("<ResidualsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get userLinePredict() {
    		throw new Error("<ResidualsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set userLinePredict(value) {
    		throw new Error("<ResidualsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bestFitLinePredict() {
    		throw new Error("<ResidualsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bestFitLinePredict(value) {
    		throw new Error("<ResidualsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/PredictTooltip.svelte generated by Svelte v3.42.6 */
    const file$4 = "src/components/PredictTooltip.svelte";

    // (23:4) {#if x}
    function create_if_block$2(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope, regDiff, regVal, showRegressionLine, userDiff, userVal, showUserLine, y, x*/ 8447) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(23:4) {#if x}",
    		ctx
    	});

    	return block;
    }

    // (27:12) {#if showUserLine}
    function create_if_block_2$1(ctx) {
    	let p;
    	let span0;
    	let t1;
    	let span1;
    	let t2;
    	let t3;
    	let t4;
    	let span2;
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			p = element("p");
    			span0 = element("span");
    			span0.textContent = "Your line";
    			t1 = text(" predicted a cost of ");
    			span1 = element("span");
    			t2 = text("$");
    			t3 = text(/*userVal*/ ctx[5]);
    			t4 = text(", yeilding a residual difference of ");
    			span2 = element("span");
    			t5 = text(/*userDiff*/ ctx[7]);
    			t6 = text(".");
    			attr_dev(span0, "class", "user svelte-yj0cs8");
    			add_location(span0, file$4, 27, 19, 673);
    			attr_dev(span1, "class", "user svelte-yj0cs8");
    			add_location(span1, file$4, 27, 75, 729);
    			attr_dev(span2, "class", "user svelte-yj0cs8");
    			add_location(span2, file$4, 27, 147, 801);
    			attr_dev(p, "class", "svelte-yj0cs8");
    			add_location(p, file$4, 27, 16, 670);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, span0);
    			append_dev(p, t1);
    			append_dev(p, span1);
    			append_dev(span1, t2);
    			append_dev(span1, t3);
    			append_dev(p, t4);
    			append_dev(p, span2);
    			append_dev(span2, t5);
    			append_dev(p, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*userVal*/ 32) set_data_dev(t3, /*userVal*/ ctx[5]);
    			if (dirty & /*userDiff*/ 128) set_data_dev(t5, /*userDiff*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(27:12) {#if showUserLine}",
    		ctx
    	});

    	return block;
    }

    // (30:12) {#if showRegressionLine}
    function create_if_block_1$1(ctx) {
    	let p;
    	let t0;
    	let span0;
    	let t2;
    	let span1;
    	let t3;
    	let t4;
    	let t5;
    	let span2;
    	let t6;
    	let t7;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("The ");
    			span0 = element("span");
    			span0.textContent = "best fit line";
    			t2 = text(" predicted a cost of ");
    			span1 = element("span");
    			t3 = text("$");
    			t4 = text(/*regVal*/ ctx[4]);
    			t5 = text(", yeilding a residual difference of ");
    			span2 = element("span");
    			t6 = text(/*regDiff*/ ctx[6]);
    			t7 = text(".");
    			attr_dev(span0, "class", "best-fit svelte-yj0cs8");
    			add_location(span0, file$4, 30, 23, 921);
    			attr_dev(span1, "class", "best-fit svelte-yj0cs8");
    			add_location(span1, file$4, 30, 87, 985);
    			attr_dev(span2, "class", "best-fit svelte-yj0cs8");
    			add_location(span2, file$4, 30, 162, 1060);
    			attr_dev(p, "class", "svelte-yj0cs8");
    			add_location(p, file$4, 30, 16, 914);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, span0);
    			append_dev(p, t2);
    			append_dev(p, span1);
    			append_dev(span1, t3);
    			append_dev(span1, t4);
    			append_dev(p, t5);
    			append_dev(p, span2);
    			append_dev(span2, t6);
    			append_dev(p, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*regVal*/ 16) set_data_dev(t4, /*regVal*/ ctx[4]);
    			if (dirty & /*regDiff*/ 64) set_data_dev(t6, /*regDiff*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(30:12) {#if showRegressionLine}",
    		ctx
    	});

    	return block;
    }

    // (24:4) <Card>
    function create_default_slot$1(ctx) {
    	let div;
    	let p;
    	let t0;
    	let strong0;
    	let t1;
    	let t2;
    	let strong2;
    	let t3;
    	let t4_value = /*y*/ ctx[1].toFixed(2) + "";
    	let t4;
    	let strong1;
    	let t5;
    	let t6;
    	let if_block0 = /*showUserLine*/ ctx[2] && create_if_block_2$1(ctx);
    	let if_block1 = /*showRegressionLine*/ ctx[3] && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text("A customer bought ");
    			strong0 = element("strong");
    			t1 = text(/*x*/ ctx[0]);
    			t2 = text(" donuts at a cost of ");
    			strong2 = element("strong");
    			t3 = text("$");
    			t4 = text(t4_value);
    			strong1 = element("strong");
    			t5 = space();
    			if (if_block0) if_block0.c();
    			t6 = space();
    			if (if_block1) if_block1.c();
    			add_location(strong0, file$4, 25, 33, 546);
    			add_location(strong1, file$4, 25, 97, 610);
    			add_location(strong2, file$4, 25, 74, 587);
    			attr_dev(p, "class", "svelte-yj0cs8");
    			add_location(p, file$4, 25, 12, 525);
    			add_location(div, file$4, 24, 8, 507);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, strong0);
    			append_dev(strong0, t1);
    			append_dev(p, t2);
    			append_dev(p, strong2);
    			append_dev(strong2, t3);
    			append_dev(strong2, t4);
    			append_dev(strong2, strong1);
    			append_dev(div, t5);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t6);
    			if (if_block1) if_block1.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*x*/ 1) set_data_dev(t1, /*x*/ ctx[0]);
    			if (dirty & /*y*/ 2 && t4_value !== (t4_value = /*y*/ ctx[1].toFixed(2) + "")) set_data_dev(t4, t4_value);

    			if (/*showUserLine*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					if_block0.m(div, t6);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*showRegressionLine*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(24:4) <Card>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*x*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*x*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*x*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let userVal;
    	let regVal;
    	let userDiff;
    	let regDiff;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PredictTooltip', slots, []);
    	let { chartWidth } = $$props;
    	let { posX } = $$props;
    	let { posY } = $$props;
    	let { x } = $$props;
    	let { y } = $$props;
    	let { showUserLine } = $$props;
    	let { showRegressionLine } = $$props;
    	let { userLinePredict } = $$props;
    	let { bestFitLinePredict } = $$props;

    	const writable_props = [
    		'chartWidth',
    		'posX',
    		'posY',
    		'x',
    		'y',
    		'showUserLine',
    		'showRegressionLine',
    		'userLinePredict',
    		'bestFitLinePredict'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PredictTooltip> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('chartWidth' in $$props) $$invalidate(8, chartWidth = $$props.chartWidth);
    		if ('posX' in $$props) $$invalidate(9, posX = $$props.posX);
    		if ('posY' in $$props) $$invalidate(10, posY = $$props.posY);
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('showUserLine' in $$props) $$invalidate(2, showUserLine = $$props.showUserLine);
    		if ('showRegressionLine' in $$props) $$invalidate(3, showRegressionLine = $$props.showRegressionLine);
    		if ('userLinePredict' in $$props) $$invalidate(11, userLinePredict = $$props.userLinePredict);
    		if ('bestFitLinePredict' in $$props) $$invalidate(12, bestFitLinePredict = $$props.bestFitLinePredict);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Card,
    		chartWidth,
    		posX,
    		posY,
    		x,
    		y,
    		showUserLine,
    		showRegressionLine,
    		userLinePredict,
    		bestFitLinePredict,
    		regVal,
    		regDiff,
    		userVal,
    		userDiff
    	});

    	$$self.$inject_state = $$props => {
    		if ('chartWidth' in $$props) $$invalidate(8, chartWidth = $$props.chartWidth);
    		if ('posX' in $$props) $$invalidate(9, posX = $$props.posX);
    		if ('posY' in $$props) $$invalidate(10, posY = $$props.posY);
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('showUserLine' in $$props) $$invalidate(2, showUserLine = $$props.showUserLine);
    		if ('showRegressionLine' in $$props) $$invalidate(3, showRegressionLine = $$props.showRegressionLine);
    		if ('userLinePredict' in $$props) $$invalidate(11, userLinePredict = $$props.userLinePredict);
    		if ('bestFitLinePredict' in $$props) $$invalidate(12, bestFitLinePredict = $$props.bestFitLinePredict);
    		if ('regVal' in $$props) $$invalidate(4, regVal = $$props.regVal);
    		if ('regDiff' in $$props) $$invalidate(6, regDiff = $$props.regDiff);
    		if ('userVal' in $$props) $$invalidate(5, userVal = $$props.userVal);
    		if ('userDiff' in $$props) $$invalidate(7, userDiff = $$props.userDiff);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*userLinePredict, x*/ 2049) {
    			$$invalidate(5, userVal = userLinePredict(x).toFixed(2));
    		}

    		if ($$self.$$.dirty & /*bestFitLinePredict, x*/ 4097) {
    			$$invalidate(4, regVal = bestFitLinePredict(x).toFixed(2));
    		}

    		if ($$self.$$.dirty & /*y, userVal*/ 34) {
    			$$invalidate(7, userDiff = (y - userVal).toFixed(2));
    		}

    		if ($$self.$$.dirty & /*y, regVal*/ 18) {
    			$$invalidate(6, regDiff = (y - regVal).toFixed(2));
    		}
    	};

    	return [
    		x,
    		y,
    		showUserLine,
    		showRegressionLine,
    		regVal,
    		userVal,
    		regDiff,
    		userDiff,
    		chartWidth,
    		posX,
    		posY,
    		userLinePredict,
    		bestFitLinePredict
    	];
    }

    class PredictTooltip extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			chartWidth: 8,
    			posX: 9,
    			posY: 10,
    			x: 0,
    			y: 1,
    			showUserLine: 2,
    			showRegressionLine: 3,
    			userLinePredict: 11,
    			bestFitLinePredict: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PredictTooltip",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*chartWidth*/ ctx[8] === undefined && !('chartWidth' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'chartWidth'");
    		}

    		if (/*posX*/ ctx[9] === undefined && !('posX' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'posX'");
    		}

    		if (/*posY*/ ctx[10] === undefined && !('posY' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'posY'");
    		}

    		if (/*x*/ ctx[0] === undefined && !('x' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'x'");
    		}

    		if (/*y*/ ctx[1] === undefined && !('y' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'y'");
    		}

    		if (/*showUserLine*/ ctx[2] === undefined && !('showUserLine' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'showUserLine'");
    		}

    		if (/*showRegressionLine*/ ctx[3] === undefined && !('showRegressionLine' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'showRegressionLine'");
    		}

    		if (/*userLinePredict*/ ctx[11] === undefined && !('userLinePredict' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'userLinePredict'");
    		}

    		if (/*bestFitLinePredict*/ ctx[12] === undefined && !('bestFitLinePredict' in props)) {
    			console.warn("<PredictTooltip> was created without expected prop 'bestFitLinePredict'");
    		}
    	}

    	get chartWidth() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chartWidth(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get posX() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posX(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get posY() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posY(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get x() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showUserLine() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showUserLine(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showRegressionLine() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showRegressionLine(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get userLinePredict() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set userLinePredict(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bestFitLinePredict() {
    		throw new Error("<PredictTooltip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bestFitLinePredict(value) {
    		throw new Error("<PredictTooltip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Chart.svelte generated by Svelte v3.42.6 */

    const { console: console_1 } = globals;
    const file$3 = "src/components/Chart.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[41] = list[i].x;
    	child_ctx[42] = list[i].y;
    	child_ctx[44] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	return child_ctx;
    }

    // (151:1) {#if showUserLineControls}
    function create_if_block_10(ctx) {
    	let control;
    	let updating_lineChecked;
    	let updating_resChecked;
    	let current;

    	function control_lineChecked_binding(value) {
    		/*control_lineChecked_binding*/ ctx[32](value);
    	}

    	function control_resChecked_binding(value) {
    		/*control_resChecked_binding*/ ctx[33](value);
    	}

    	let control_props = {
    		id: "yourLine",
    		slope: /*$userLineStore*/ ctx[7].slope(),
    		yInt: /*$userLineStore*/ ctx[7].intercept(),
    		showResidualControls: /*showResidualControls*/ ctx[21],
    		showResValues: /*showUserResiduals*/ ctx[5],
    		color: "primary",
    		$$slots: { default: [create_default_slot_1] },
    		$$scope: { ctx }
    	};

    	if (/*showUserLine*/ ctx[3] !== void 0) {
    		control_props.lineChecked = /*showUserLine*/ ctx[3];
    	}

    	if (/*showUserResiduals*/ ctx[5] !== void 0) {
    		control_props.resChecked = /*showUserResiduals*/ ctx[5];
    	}

    	control = new Control({ props: control_props, $$inline: true });
    	binding_callbacks.push(() => bind(control, 'lineChecked', control_lineChecked_binding));
    	binding_callbacks.push(() => bind(control, 'resChecked', control_resChecked_binding));

    	const block = {
    		c: function create() {
    			create_component(control.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(control, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const control_changes = {};
    			if (dirty[0] & /*$userLineStore*/ 128) control_changes.slope = /*$userLineStore*/ ctx[7].slope();
    			if (dirty[0] & /*$userLineStore*/ 128) control_changes.yInt = /*$userLineStore*/ ctx[7].intercept();
    			if (dirty[0] & /*showResidualControls*/ 2097152) control_changes.showResidualControls = /*showResidualControls*/ ctx[21];
    			if (dirty[0] & /*showUserResiduals*/ 32) control_changes.showResValues = /*showUserResiduals*/ ctx[5];

    			if (dirty[1] & /*$$scope*/ 524288) {
    				control_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_lineChecked && dirty[0] & /*showUserLine*/ 8) {
    				updating_lineChecked = true;
    				control_changes.lineChecked = /*showUserLine*/ ctx[3];
    				add_flush_callback(() => updating_lineChecked = false);
    			}

    			if (!updating_resChecked && dirty[0] & /*showUserResiduals*/ 32) {
    				updating_resChecked = true;
    				control_changes.resChecked = /*showUserResiduals*/ ctx[5];
    				add_flush_callback(() => updating_resChecked = false);
    			}

    			control.$set(control_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(control.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(control.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(control, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(151:1) {#if showUserLineControls}",
    		ctx
    	});

    	return block;
    }

    // (152:2) <Control     id='yourLine'     slope={$userLineStore.slope()}    yInt={$userLineStore.intercept()}    bind:lineChecked={showUserLine}     bind:resChecked={showUserResiduals}    showResidualControls={showResidualControls}    showResValues={showUserResiduals}    color='primary'>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Your Line");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(152:2) <Control     id='yourLine'     slope={$userLineStore.slope()}    yInt={$userLineStore.intercept()}    bind:lineChecked={showUserLine}     bind:resChecked={showUserResiduals}    showResidualControls={showResidualControls}    showResValues={showUserResiduals}    color='primary'>",
    		ctx
    	});

    	return block;
    }

    // (164:1) {#if showRegressionLineControls}
    function create_if_block_9(ctx) {
    	let control;
    	let updating_lineChecked;
    	let updating_resChecked;
    	let current;

    	function control_lineChecked_binding_1(value) {
    		/*control_lineChecked_binding_1*/ ctx[34](value);
    	}

    	function control_resChecked_binding_1(value) {
    		/*control_resChecked_binding_1*/ ctx[35](value);
    	}

    	let control_props = {
    		id: "regressionLine",
    		slope: /*$regressionLineStore*/ ctx[26].a,
    		yInt: /*$regressionLineStore*/ ctx[26].b,
    		showResidualControls: /*showResidualControls*/ ctx[21],
    		showResValues: /*showRegressionResiduals*/ ctx[6],
    		color: "secondary",
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*showRegressionLine*/ ctx[2] !== void 0) {
    		control_props.lineChecked = /*showRegressionLine*/ ctx[2];
    	}

    	if (/*showRegressionResiduals*/ ctx[6] !== void 0) {
    		control_props.resChecked = /*showRegressionResiduals*/ ctx[6];
    	}

    	control = new Control({ props: control_props, $$inline: true });
    	binding_callbacks.push(() => bind(control, 'lineChecked', control_lineChecked_binding_1));
    	binding_callbacks.push(() => bind(control, 'resChecked', control_resChecked_binding_1));

    	const block = {
    		c: function create() {
    			create_component(control.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(control, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const control_changes = {};
    			if (dirty[0] & /*$regressionLineStore*/ 67108864) control_changes.slope = /*$regressionLineStore*/ ctx[26].a;
    			if (dirty[0] & /*$regressionLineStore*/ 67108864) control_changes.yInt = /*$regressionLineStore*/ ctx[26].b;
    			if (dirty[0] & /*showResidualControls*/ 2097152) control_changes.showResidualControls = /*showResidualControls*/ ctx[21];
    			if (dirty[0] & /*showRegressionResiduals*/ 64) control_changes.showResValues = /*showRegressionResiduals*/ ctx[6];

    			if (dirty[1] & /*$$scope*/ 524288) {
    				control_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_lineChecked && dirty[0] & /*showRegressionLine*/ 4) {
    				updating_lineChecked = true;
    				control_changes.lineChecked = /*showRegressionLine*/ ctx[2];
    				add_flush_callback(() => updating_lineChecked = false);
    			}

    			if (!updating_resChecked && dirty[0] & /*showRegressionResiduals*/ 64) {
    				updating_resChecked = true;
    				control_changes.resChecked = /*showRegressionResiduals*/ ctx[6];
    				add_flush_callback(() => updating_resChecked = false);
    			}

    			control.$set(control_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(control.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(control.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(control, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(164:1) {#if showRegressionLineControls}",
    		ctx
    	});

    	return block;
    }

    // (165:2) <Control     id='regressionLine'     slope={$regressionLineStore.a}    yInt={$regressionLineStore.b}    bind:lineChecked={showRegressionLine}     bind:resChecked={showRegressionResiduals}    showResidualControls={showResidualControls}    showResValues={showRegressionResiduals}    color='secondary'>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Best Fit Line");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(165:2) <Control     id='regressionLine'     slope={$regressionLineStore.a}    yInt={$regressionLineStore.b}    bind:lineChecked={showRegressionLine}     bind:resChecked={showRegressionResiduals}    showResidualControls={showResidualControls}    showResValues={showRegressionResiduals}    color='secondary'>",
    		ctx
    	});

    	return block;
    }

    // (179:0) {#if showResidualsTable}
    function create_if_block_8(ctx) {
    	let div;
    	let residualstable;
    	let current;

    	residualstable = new ResidualsTable({
    			props: {
    				highlightId: /*highlightId*/ ctx[11],
    				showRegressionResiduals: /*showRegressionResiduals*/ ctx[6],
    				showUserResiduals: /*showUserResiduals*/ ctx[5],
    				userLinePredict: /*userLinePredict*/ ctx[14],
    				bestFitLinePredict: /*$regressionLineStore*/ ctx[26].predict
    			},
    			$$inline: true
    		});

    	residualstable.$on("click", /*highlight*/ ctx[29]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(residualstable.$$.fragment);
    			attr_dev(div, "id", "residualsTable");
    			attr_dev(div, "class", "svelte-qph85x");
    			add_location(div, file$3, 179, 1, 4242);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(residualstable, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const residualstable_changes = {};
    			if (dirty[0] & /*highlightId*/ 2048) residualstable_changes.highlightId = /*highlightId*/ ctx[11];
    			if (dirty[0] & /*showRegressionResiduals*/ 64) residualstable_changes.showRegressionResiduals = /*showRegressionResiduals*/ ctx[6];
    			if (dirty[0] & /*showUserResiduals*/ 32) residualstable_changes.showUserResiduals = /*showUserResiduals*/ ctx[5];
    			if (dirty[0] & /*userLinePredict*/ 16384) residualstable_changes.userLinePredict = /*userLinePredict*/ ctx[14];
    			if (dirty[0] & /*$regressionLineStore*/ 67108864) residualstable_changes.bestFitLinePredict = /*$regressionLineStore*/ ctx[26].predict;
    			residualstable.$set(residualstable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(residualstable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(residualstable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(residualstable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(179:0) {#if showResidualsTable}",
    		ctx
    	});

    	return block;
    }

    // (191:0) {#if showPredictTooltip}
    function create_if_block_7(ctx) {
    	let predicttooltip;
    	let current;

    	const predicttooltip_spread_levels = [
    		{ chartWidth: /*width*/ ctx[0] },
    		{ showUserLine: /*showUserLine*/ ctx[3] },
    		{
    			showRegressionLine: /*showRegressionLine*/ ctx[2]
    		},
    		{
    			userLinePredict: /*userLinePredict*/ ctx[14]
    		},
    		{
    			bestFitLinePredict: /*$regressionLineStore*/ ctx[26].predict
    		},
    		{
    			clickedElement: /*clickedElement*/ ctx[12]
    		},
    		points[/*$member*/ ctx[25]][/*highlightId*/ ctx[11]]
    	];

    	let predicttooltip_props = {};

    	for (let i = 0; i < predicttooltip_spread_levels.length; i += 1) {
    		predicttooltip_props = assign(predicttooltip_props, predicttooltip_spread_levels[i]);
    	}

    	predicttooltip = new PredictTooltip({
    			props: predicttooltip_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(predicttooltip.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(predicttooltip, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const predicttooltip_changes = (dirty[0] & /*width, showUserLine, showRegressionLine, userLinePredict, $regressionLineStore, clickedElement, $member, highlightId*/ 100685837)
    			? get_spread_update(predicttooltip_spread_levels, [
    					dirty[0] & /*width*/ 1 && { chartWidth: /*width*/ ctx[0] },
    					dirty[0] & /*showUserLine*/ 8 && { showUserLine: /*showUserLine*/ ctx[3] },
    					dirty[0] & /*showRegressionLine*/ 4 && {
    						showRegressionLine: /*showRegressionLine*/ ctx[2]
    					},
    					dirty[0] & /*userLinePredict*/ 16384 && {
    						userLinePredict: /*userLinePredict*/ ctx[14]
    					},
    					dirty[0] & /*$regressionLineStore*/ 67108864 && {
    						bestFitLinePredict: /*$regressionLineStore*/ ctx[26].predict
    					},
    					dirty[0] & /*clickedElement*/ 4096 && {
    						clickedElement: /*clickedElement*/ ctx[12]
    					},
    					dirty[0] & /*$member, highlightId*/ 33556480 && get_spread_object(points[/*$member*/ ctx[25]][/*highlightId*/ ctx[11]])
    				])
    			: {};

    			predicttooltip.$set(predicttooltip_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(predicttooltip.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(predicttooltip.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(predicttooltip, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(191:0) {#if showPredictTooltip}",
    		ctx
    	});

    	return block;
    }

    // (211:3) {#each yTicks as tick}
    function create_each_block_2(ctx) {
    	let axis;
    	let current;

    	axis = new Axis({
    			props: {
    				axisType: "yAxis",
    				translate: "translate(0, " + /*yScale*/ ctx[17](/*tick*/ ctx[45]) + ")",
    				x1: /*xScale*/ ctx[18](0),
    				x2: /*xScale*/ ctx[18](extent(/*xTicks*/ ctx[16])[1]),
    				x: /*margins*/ ctx[27].left - 8,
    				y: "+4",
    				text: /*tick*/ ctx[45]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(axis.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(axis, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const axis_changes = {};
    			if (dirty[0] & /*yScale, yTicks*/ 163840) axis_changes.translate = "translate(0, " + /*yScale*/ ctx[17](/*tick*/ ctx[45]) + ")";
    			if (dirty[0] & /*xScale*/ 262144) axis_changes.x1 = /*xScale*/ ctx[18](0);
    			if (dirty[0] & /*xScale, xTicks*/ 327680) axis_changes.x2 = /*xScale*/ ctx[18](extent(/*xTicks*/ ctx[16])[1]);
    			if (dirty[0] & /*yTicks*/ 32768) axis_changes.text = /*tick*/ ctx[45];
    			axis.$set(axis_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(axis.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(axis.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(axis, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(211:3) {#each yTicks as tick}",
    		ctx
    	});

    	return block;
    }

    // (220:3) {#each xTicks as tick}
    function create_each_block_1(ctx) {
    	let axis;
    	let current;

    	axis = new Axis({
    			props: {
    				axisType: "xAxis",
    				translate: "translate(" + /*xScale*/ ctx[18](/*tick*/ ctx[45]) + ",0)",
    				y1: /*yScale*/ ctx[17](0),
    				y2: /*yScale*/ ctx[17](extent(/*yTicks*/ ctx[15])[1]),
    				y: /*height*/ ctx[1] - /*margins*/ ctx[27].bottom + 16,
    				text: /*tick*/ ctx[45]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(axis.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(axis, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const axis_changes = {};
    			if (dirty[0] & /*xScale, xTicks*/ 327680) axis_changes.translate = "translate(" + /*xScale*/ ctx[18](/*tick*/ ctx[45]) + ",0)";
    			if (dirty[0] & /*yScale*/ 131072) axis_changes.y1 = /*yScale*/ ctx[17](0);
    			if (dirty[0] & /*yScale, yTicks*/ 163840) axis_changes.y2 = /*yScale*/ ctx[17](extent(/*yTicks*/ ctx[15])[1]);
    			if (dirty[0] & /*height*/ 2) axis_changes.y = /*height*/ ctx[1] - /*margins*/ ctx[27].bottom + 16;
    			if (dirty[0] & /*xTicks*/ 65536) axis_changes.text = /*tick*/ ctx[45];
    			axis.$set(axis_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(axis.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(axis.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(axis, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(220:3) {#each xTicks as tick}",
    		ctx
    	});

    	return block;
    }

    // (228:3) {#if showPoints}
    function create_if_block_6(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = points[/*$member*/ ctx[25]];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*showHighlighting, highlightId, xScale, $member, yScale, highlight*/ 570828800) {
    				each_value = points[/*$member*/ ctx[25]];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(228:3) {#if showPoints}",
    		ctx
    	});

    	return block;
    }

    // (230:4) {#each points[$member] as {x, y}
    function create_each_block$1(ctx) {
    	let circle;
    	let current;

    	circle = new Circle({
    			props: {
    				showHighlighting: /*showHighlighting*/ ctx[13],
    				highlightId: /*highlightId*/ ctx[11],
    				cx: /*xScale*/ ctx[18](/*x*/ ctx[41]),
    				cy: /*yScale*/ ctx[17](/*y*/ ctx[42]),
    				id: /*i*/ ctx[44]
    			},
    			$$inline: true
    		});

    	circle.$on("click", /*highlight*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(circle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(circle, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const circle_changes = {};
    			if (dirty[0] & /*showHighlighting*/ 8192) circle_changes.showHighlighting = /*showHighlighting*/ ctx[13];
    			if (dirty[0] & /*highlightId*/ 2048) circle_changes.highlightId = /*highlightId*/ ctx[11];
    			if (dirty[0] & /*xScale, $member*/ 33816576) circle_changes.cx = /*xScale*/ ctx[18](/*x*/ ctx[41]);
    			if (dirty[0] & /*yScale, $member*/ 33685504) circle_changes.cy = /*yScale*/ ctx[17](/*y*/ ctx[42]);
    			circle.$set(circle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(circle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(circle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(circle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(230:4) {#each points[$member] as {x, y}",
    		ctx
    	});

    	return block;
    }

    // (245:3) {#if showRegressionLine}
    function create_if_block_3(ctx) {
    	let if_block0_anchor;
    	let regressionline;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*showRegressionResiduals*/ ctx[6] && create_if_block_5(ctx);

    	regressionline = new RegressionLine({
    			props: {
    				xScale: /*xScale*/ ctx[18],
    				yScale: /*yScale*/ ctx[17]
    			},
    			$$inline: true
    		});

    	let if_block1 = /*showSingleResidual*/ ctx[4] && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			create_component(regressionline.$$.fragment);
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, if_block0_anchor, anchor);
    			mount_component(regressionline, target, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*showRegressionResiduals*/ ctx[6]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*showRegressionResiduals*/ 64) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const regressionline_changes = {};
    			if (dirty[0] & /*xScale*/ 262144) regressionline_changes.xScale = /*xScale*/ ctx[18];
    			if (dirty[0] & /*yScale*/ 131072) regressionline_changes.yScale = /*yScale*/ ctx[17];
    			regressionline.$set(regressionline_changes);

    			if (/*showSingleResidual*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*showSingleResidual*/ 16) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(regressionline.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(regressionline.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(if_block0_anchor);
    			destroy_component(regressionline, detaching);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(245:3) {#if showRegressionLine}",
    		ctx
    	});

    	return block;
    }

    // (247:4) {#if showRegressionResiduals}
    function create_if_block_5(ctx) {
    	let residuals;
    	let current;

    	residuals = new Residuals({
    			props: {
    				translating: /*translating*/ ctx[9],
    				highlightId: /*highlightId*/ ctx[11],
    				groupId: "regressionLineResiduals",
    				xScale: /*xScale*/ ctx[18],
    				yScale: /*yScale*/ ctx[17],
    				points: points[/*$member*/ ctx[25]],
    				predict: /*$regressionLineStore*/ ctx[26].predict
    			},
    			$$inline: true
    		});

    	residuals.$on("click", /*highlight*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(residuals.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(residuals, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const residuals_changes = {};
    			if (dirty[0] & /*translating*/ 512) residuals_changes.translating = /*translating*/ ctx[9];
    			if (dirty[0] & /*highlightId*/ 2048) residuals_changes.highlightId = /*highlightId*/ ctx[11];
    			if (dirty[0] & /*xScale*/ 262144) residuals_changes.xScale = /*xScale*/ ctx[18];
    			if (dirty[0] & /*yScale*/ 131072) residuals_changes.yScale = /*yScale*/ ctx[17];
    			if (dirty[0] & /*$member*/ 33554432) residuals_changes.points = points[/*$member*/ ctx[25]];
    			if (dirty[0] & /*$regressionLineStore*/ 67108864) residuals_changes.predict = /*$regressionLineStore*/ ctx[26].predict;
    			residuals.$set(residuals_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(residuals.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(residuals.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(residuals, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(247:4) {#if showRegressionResiduals}",
    		ctx
    	});

    	return block;
    }

    // (259:4) {#if showSingleResidual}
    function create_if_block_4(ctx) {
    	let singleresidual;
    	let current;

    	singleresidual = new SingleResidual({
    			props: {
    				translating: /*singleTranslating*/ ctx[10],
    				highlightId: /*highlightId*/ ctx[11],
    				groupId: "regressionLineResidual",
    				xScale: /*xScale*/ ctx[18],
    				yScale: /*yScale*/ ctx[17],
    				points: points[/*$member*/ ctx[25]],
    				predict: /*$regressionLineStore*/ ctx[26].predict
    			},
    			$$inline: true
    		});

    	singleresidual.$on("click", /*highlight*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(singleresidual.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(singleresidual, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const singleresidual_changes = {};
    			if (dirty[0] & /*singleTranslating*/ 1024) singleresidual_changes.translating = /*singleTranslating*/ ctx[10];
    			if (dirty[0] & /*highlightId*/ 2048) singleresidual_changes.highlightId = /*highlightId*/ ctx[11];
    			if (dirty[0] & /*xScale*/ 262144) singleresidual_changes.xScale = /*xScale*/ ctx[18];
    			if (dirty[0] & /*yScale*/ 131072) singleresidual_changes.yScale = /*yScale*/ ctx[17];
    			if (dirty[0] & /*$member*/ 33554432) singleresidual_changes.points = points[/*$member*/ ctx[25]];
    			if (dirty[0] & /*$regressionLineStore*/ 67108864) singleresidual_changes.predict = /*$regressionLineStore*/ ctx[26].predict;
    			singleresidual.$set(singleresidual_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(singleresidual.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(singleresidual.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(singleresidual, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(259:4) {#if showSingleResidual}",
    		ctx
    	});

    	return block;
    }

    // (274:3) {#if showUserLine}
    function create_if_block$1(ctx) {
    	let if_block0_anchor;
    	let userline;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*showUserResiduals*/ ctx[5] && create_if_block_2(ctx);

    	userline = new UserLine({
    			props: {
    				xScale: /*xScale*/ ctx[18],
    				yScale: /*yScale*/ ctx[17],
    				svg: /*svg*/ ctx[8]
    			},
    			$$inline: true
    		});

    	let if_block1 = /*showSingleResidual*/ ctx[4] && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			create_component(userline.$$.fragment);
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, if_block0_anchor, anchor);
    			mount_component(userline, target, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*showUserResiduals*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*showUserResiduals*/ 32) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const userline_changes = {};
    			if (dirty[0] & /*xScale*/ 262144) userline_changes.xScale = /*xScale*/ ctx[18];
    			if (dirty[0] & /*yScale*/ 131072) userline_changes.yScale = /*yScale*/ ctx[17];
    			if (dirty[0] & /*svg*/ 256) userline_changes.svg = /*svg*/ ctx[8];
    			userline.$set(userline_changes);

    			if (/*showSingleResidual*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*showSingleResidual*/ 16) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(userline.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(userline.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(if_block0_anchor);
    			destroy_component(userline, detaching);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(274:3) {#if showUserLine}",
    		ctx
    	});

    	return block;
    }

    // (275:4) {#if showUserResiduals}
    function create_if_block_2(ctx) {
    	let residuals;
    	let current;

    	residuals = new Residuals({
    			props: {
    				translating: /*translating*/ ctx[9],
    				highlightId: /*highlightId*/ ctx[11],
    				groupId: "userLineResiduals",
    				xScale: /*xScale*/ ctx[18],
    				yScale: /*yScale*/ ctx[17],
    				points: points[/*$member*/ ctx[25]],
    				predict: /*userLinePredict*/ ctx[14]
    			},
    			$$inline: true
    		});

    	residuals.$on("click", /*highlight*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(residuals.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(residuals, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const residuals_changes = {};
    			if (dirty[0] & /*translating*/ 512) residuals_changes.translating = /*translating*/ ctx[9];
    			if (dirty[0] & /*highlightId*/ 2048) residuals_changes.highlightId = /*highlightId*/ ctx[11];
    			if (dirty[0] & /*xScale*/ 262144) residuals_changes.xScale = /*xScale*/ ctx[18];
    			if (dirty[0] & /*yScale*/ 131072) residuals_changes.yScale = /*yScale*/ ctx[17];
    			if (dirty[0] & /*$member*/ 33554432) residuals_changes.points = points[/*$member*/ ctx[25]];
    			if (dirty[0] & /*userLinePredict*/ 16384) residuals_changes.predict = /*userLinePredict*/ ctx[14];
    			residuals.$set(residuals_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(residuals.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(residuals.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(residuals, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(275:4) {#if showUserResiduals}",
    		ctx
    	});

    	return block;
    }

    // (289:4) {#if showSingleResidual}
    function create_if_block_1(ctx) {
    	let singleresidual;
    	let current;

    	singleresidual = new SingleResidual({
    			props: {
    				translating: /*singleTranslating*/ ctx[10],
    				highlightId: /*highlightId*/ ctx[11],
    				groupId: "userLineResidual",
    				xScale: /*xScale*/ ctx[18],
    				yScale: /*yScale*/ ctx[17],
    				points: points[/*$member*/ ctx[25]],
    				predict: /*userLinePredict*/ ctx[14]
    			},
    			$$inline: true
    		});

    	singleresidual.$on("click", /*highlight*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(singleresidual.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(singleresidual, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const singleresidual_changes = {};
    			if (dirty[0] & /*singleTranslating*/ 1024) singleresidual_changes.translating = /*singleTranslating*/ ctx[10];
    			if (dirty[0] & /*highlightId*/ 2048) singleresidual_changes.highlightId = /*highlightId*/ ctx[11];
    			if (dirty[0] & /*xScale*/ 262144) singleresidual_changes.xScale = /*xScale*/ ctx[18];
    			if (dirty[0] & /*yScale*/ 131072) singleresidual_changes.yScale = /*yScale*/ ctx[17];
    			if (dirty[0] & /*$member*/ 33554432) singleresidual_changes.points = points[/*$member*/ ctx[25]];
    			if (dirty[0] & /*userLinePredict*/ 16384) singleresidual_changes.predict = /*userLinePredict*/ ctx[14];
    			singleresidual.$set(singleresidual_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(singleresidual.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(singleresidual.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(singleresidual, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(289:4) {#if showSingleResidual}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let div1;
    	let svg_1;
    	let g0;
    	let text1;
    	let t4;
    	let text0;
    	let text1_transform_value;
    	let g1;
    	let text3;
    	let t5;
    	let text2;
    	let text3_x_value;
    	let text3_y_value;
    	let g2;
    	let g3;
    	let g4;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*showUserLineControls*/ ctx[23] && create_if_block_10(ctx);
    	let if_block1 = /*showRegressionLineControls*/ ctx[22] && create_if_block_9(ctx);
    	let if_block2 = /*showResidualsTable*/ ctx[19] && create_if_block_8(ctx);
    	let if_block3 = /*showPredictTooltip*/ ctx[20] && create_if_block_7(ctx);
    	let each_value_2 = /*yTicks*/ ctx[15];
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value_1 = /*xTicks*/ ctx[16];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block4 = /*showPoints*/ ctx[24] && create_if_block_6(ctx);
    	let if_block5 = /*showRegressionLine*/ ctx[2] && create_if_block_3(ctx);
    	let if_block6 = /*showUserLine*/ ctx[3] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			div1 = element("div");
    			svg_1 = svg_element("svg");
    			g0 = svg_element("g");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			text1 = svg_element("text");
    			t4 = text("cost ($)");
    			text0 = svg_element("text");
    			g1 = svg_element("g");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			text3 = svg_element("text");
    			t5 = text("donuts");
    			text2 = svg_element("text");
    			g2 = svg_element("g");
    			if (if_block4) if_block4.c();
    			g3 = svg_element("g");
    			if (if_block5) if_block5.c();
    			g4 = svg_element("g");
    			if (if_block6) if_block6.c();
    			attr_dev(div0, "id", "controls");
    			attr_dev(div0, "class", "svelte-qph85x");
    			add_location(div0, file$3, 149, 0, 3474);
    			add_location(text0, file$3, 214, 12, 5173);
    			attr_dev(text1, "text-anchor", "middle");
    			attr_dev(text1, "transform", text1_transform_value = "translate(20," + /*height*/ ctx[1] / 2 + ") rotate(-90)");
    			add_location(text1, file$3, 213, 3, 5085);
    			attr_dev(g0, "class", "axis y-axis");
    			add_location(g0, file$3, 209, 2, 4854);
    			add_location(text2, file$3, 223, 10, 5534);
    			set_style(text3, "text-anchor", "middle");
    			attr_dev(text3, "x", text3_x_value = /*width*/ ctx[0] / 2 + /*margins*/ ctx[27].left);
    			attr_dev(text3, "y", text3_y_value = /*height*/ ctx[1] - /*margins*/ ctx[27].bottom / 2 + 15);
    			add_location(text3, file$3, 222, 3, 5428);
    			attr_dev(g1, "class", "axis x-axis");
    			add_location(g1, file$3, 218, 2, 5193);
    			attr_dev(g2, "class", "points");
    			add_location(g2, file$3, 226, 2, 5553);
    			attr_dev(g3, "class", "regressionLine svelte-qph85x");
    			add_location(g3, file$3, 243, 2, 5833);
    			attr_dev(g4, "class", "userLine svelte-qph85x");
    			add_location(g4, file$3, 272, 2, 6522);
    			attr_dev(svg_1, "class", "svelte-qph85x");
    			add_location(svg_1, file$3, 207, 1, 4794);
    			attr_dev(div1, "id", "chart");
    			attr_dev(div1, "class", "svelte-qph85x");
    			add_location(div1, file$3, 205, 0, 4774);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t0);
    			if (if_block1) if_block1.m(div0, null);
    			insert_dev(target, t1, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, svg_1);
    			append_dev(svg_1, g0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(g0, null);
    			}

    			append_dev(g0, text1);
    			append_dev(text1, t4);
    			append_dev(text1, text0);
    			append_dev(svg_1, g1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(g1, null);
    			}

    			append_dev(g1, text3);
    			append_dev(text3, t5);
    			append_dev(text3, text2);
    			append_dev(svg_1, g2);
    			if (if_block4) if_block4.m(g2, null);
    			append_dev(svg_1, g3);
    			if (if_block5) if_block5.m(g3, null);
    			append_dev(svg_1, g4);
    			if (if_block6) if_block6.m(g4, null);
    			/*svg_1_binding*/ ctx[36](svg_1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "resize", /*resize*/ ctx[28], false, false, false),
    					listen_dev(svg_1, "click", self$1(/*removeHighlights*/ ctx[30]), false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*showUserLineControls*/ ctx[23]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*showUserLineControls*/ 8388608) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_10(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*showRegressionLineControls*/ ctx[22]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*showRegressionLineControls*/ 4194304) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_9(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*showResidualsTable*/ ctx[19]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*showResidualsTable*/ 524288) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_8(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t2.parentNode, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*showPredictTooltip*/ ctx[20]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*showPredictTooltip*/ 1048576) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_7(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(t3.parentNode, t3);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (dirty[0] & /*yScale, yTicks, xScale, xTicks, margins*/ 134709248) {
    				each_value_2 = /*yTicks*/ ctx[15];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(g0, text1);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*height*/ 2 && text1_transform_value !== (text1_transform_value = "translate(20," + /*height*/ ctx[1] / 2 + ") rotate(-90)")) {
    				attr_dev(text1, "transform", text1_transform_value);
    			}

    			if (dirty[0] & /*xScale, xTicks, yScale, yTicks, height, margins*/ 134709250) {
    				each_value_1 = /*xTicks*/ ctx[16];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(g1, text3);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*width*/ 1 && text3_x_value !== (text3_x_value = /*width*/ ctx[0] / 2 + /*margins*/ ctx[27].left)) {
    				attr_dev(text3, "x", text3_x_value);
    			}

    			if (!current || dirty[0] & /*height*/ 2 && text3_y_value !== (text3_y_value = /*height*/ ctx[1] - /*margins*/ ctx[27].bottom / 2 + 15)) {
    				attr_dev(text3, "y", text3_y_value);
    			}

    			if (/*showPoints*/ ctx[24]) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);

    					if (dirty[0] & /*showPoints*/ 16777216) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_6(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(g2, null);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}

    			if (/*showRegressionLine*/ ctx[2]) {
    				if (if_block5) {
    					if_block5.p(ctx, dirty);

    					if (dirty[0] & /*showRegressionLine*/ 4) {
    						transition_in(if_block5, 1);
    					}
    				} else {
    					if_block5 = create_if_block_3(ctx);
    					if_block5.c();
    					transition_in(if_block5, 1);
    					if_block5.m(g3, null);
    				}
    			} else if (if_block5) {
    				group_outros();

    				transition_out(if_block5, 1, 1, () => {
    					if_block5 = null;
    				});

    				check_outros();
    			}

    			if (/*showUserLine*/ ctx[3]) {
    				if (if_block6) {
    					if_block6.p(ctx, dirty);

    					if (dirty[0] & /*showUserLine*/ 8) {
    						transition_in(if_block6, 1);
    					}
    				} else {
    					if_block6 = create_if_block$1(ctx);
    					if_block6.c();
    					transition_in(if_block6, 1);
    					if_block6.m(g4, null);
    				}
    			} else if (if_block6) {
    				group_outros();

    				transition_out(if_block6, 1, 1, () => {
    					if_block6 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block4);
    			transition_in(if_block5);
    			transition_in(if_block6);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block4);
    			transition_out(if_block5);
    			transition_out(if_block6);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching) detach_dev(t1);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    			if (if_block4) if_block4.d();
    			if (if_block5) if_block5.d();
    			if (if_block6) if_block6.d();
    			/*svg_1_binding*/ ctx[36](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let showPoints;
    	let showUserLine;
    	let showRegressionLine;
    	let showUserLineControls;
    	let showRegressionLineControls;
    	let showResidualControls;
    	let showHighlighting;
    	let showSingleResidual;
    	let showPredictTooltip;
    	let showRegressionResiduals;
    	let showUserResiduals;
    	let showResidualsTable;
    	let xScale;
    	let yScale;
    	let xTicks;
    	let yTicks;
    	let userLinePredict;
    	let $userLineStore;
    	let $member;
    	let $counter;
    	let $regressionLineStore;
    	validate_store(userLineStore, 'userLineStore');
    	component_subscribe($$self, userLineStore, $$value => $$invalidate(7, $userLineStore = $$value));
    	validate_store(member, 'member');
    	component_subscribe($$self, member, $$value => $$invalidate(25, $member = $$value));
    	validate_store(counter, 'counter');
    	component_subscribe($$self, counter, $$value => $$invalidate(31, $counter = $$value));
    	validate_store(regressionLineStore, 'regressionLineStore');
    	component_subscribe($$self, regressionLineStore, $$value => $$invalidate(26, $regressionLineStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chart', slots, []);
    	let svg;
    	let width = 600;
    	let height = 400;

    	// chart margin
    	const margins = { top: 20, right: 20, bottom: 50, left: 50 };

    	// MATHS
    	// array range
    	const [minX, maxX] = extent(points[$member], d => d.x);

    	const [minY, maxY] = extent(points[$member], d => d.y);

    	// responsiveness
    	onMount(resize);

    	afterUpdate(() => {
    		resize();
    	});

    	function resize() {
    		$$invalidate(0, { width, height } = svg.getBoundingClientRect(), width, $$invalidate(1, height));
    	}

    	//STATE CHANGE LOGIC
    	// changing datasets...will come back to this later
    	//tweening function
    	// const tweenedPoints = tweened(points, {
    	// 	delay: 0,
    	// 	duration: 750,
    	// 	easing: easings.cubicOut 
    	// });
    	// function setTween(key) {
    	// 	tweenedPoints.set(data[key]);
    	// }
    	// $: setTween(member)
    	// logic for seperating residuals slightly when both lines are present. 
    	let translating = false;

    	let singleTranslating = false;

    	// locig for highlighing related elements on click
    	let highlightId;

    	let clickedElement;

    	const highlight = event => {
    		if (showHighlighting) {
    			$$invalidate(11, highlightId = event.target.id);
    			$$invalidate(12, clickedElement = event.target);
    		}
    	};

    	const removeHighlights = event => {
    		$$invalidate(11, highlightId = undefined);
    		console.log(event.target);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Chart> was created with unknown prop '${key}'`);
    	});

    	function control_lineChecked_binding(value) {
    		showUserLine = value;
    		($$invalidate(3, showUserLine), $$invalidate(31, $counter));
    	}

    	function control_resChecked_binding(value) {
    		showUserResiduals = value;
    		($$invalidate(5, showUserResiduals), $$invalidate(31, $counter));
    	}

    	function control_lineChecked_binding_1(value) {
    		showRegressionLine = value;
    		($$invalidate(2, showRegressionLine), $$invalidate(31, $counter));
    	}

    	function control_resChecked_binding_1(value) {
    		showRegressionResiduals = value;
    		($$invalidate(6, showRegressionResiduals), $$invalidate(31, $counter));
    	}

    	function svg_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			svg = $$value;
    			$$invalidate(8, svg);
    		});
    	}

    	$$self.$capture_state = () => ({
    		tweened,
    		onMount,
    		scaleLinear: linear,
    		extent,
    		regressionLinear: d3Regression.regressionLinear,
    		beforeUpdate,
    		afterUpdate,
    		easings,
    		fly,
    		sequence,
    		counter,
    		member,
    		points,
    		regressionLineStore,
    		userLineStore,
    		Circle,
    		Axis,
    		RegressionLine,
    		UserLine,
    		Control,
    		Residuals,
    		SingleResidual,
    		ResidualsTable,
    		PredictTooltip,
    		svg,
    		width,
    		height,
    		margins,
    		minX,
    		maxX,
    		minY,
    		maxY,
    		resize,
    		translating,
    		singleTranslating,
    		highlightId,
    		clickedElement,
    		highlight,
    		removeHighlights,
    		showHighlighting,
    		showRegressionLine,
    		showUserLine,
    		showSingleResidual,
    		showUserResiduals,
    		showRegressionResiduals,
    		userLinePredict,
    		yTicks,
    		xTicks,
    		yScale,
    		xScale,
    		showResidualsTable,
    		showPredictTooltip,
    		showResidualControls,
    		showRegressionLineControls,
    		showUserLineControls,
    		showPoints,
    		$userLineStore,
    		$member,
    		$counter,
    		$regressionLineStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('svg' in $$props) $$invalidate(8, svg = $$props.svg);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('translating' in $$props) $$invalidate(9, translating = $$props.translating);
    		if ('singleTranslating' in $$props) $$invalidate(10, singleTranslating = $$props.singleTranslating);
    		if ('highlightId' in $$props) $$invalidate(11, highlightId = $$props.highlightId);
    		if ('clickedElement' in $$props) $$invalidate(12, clickedElement = $$props.clickedElement);
    		if ('showHighlighting' in $$props) $$invalidate(13, showHighlighting = $$props.showHighlighting);
    		if ('showRegressionLine' in $$props) $$invalidate(2, showRegressionLine = $$props.showRegressionLine);
    		if ('showUserLine' in $$props) $$invalidate(3, showUserLine = $$props.showUserLine);
    		if ('showSingleResidual' in $$props) $$invalidate(4, showSingleResidual = $$props.showSingleResidual);
    		if ('showUserResiduals' in $$props) $$invalidate(5, showUserResiduals = $$props.showUserResiduals);
    		if ('showRegressionResiduals' in $$props) $$invalidate(6, showRegressionResiduals = $$props.showRegressionResiduals);
    		if ('userLinePredict' in $$props) $$invalidate(14, userLinePredict = $$props.userLinePredict);
    		if ('yTicks' in $$props) $$invalidate(15, yTicks = $$props.yTicks);
    		if ('xTicks' in $$props) $$invalidate(16, xTicks = $$props.xTicks);
    		if ('yScale' in $$props) $$invalidate(17, yScale = $$props.yScale);
    		if ('xScale' in $$props) $$invalidate(18, xScale = $$props.xScale);
    		if ('showResidualsTable' in $$props) $$invalidate(19, showResidualsTable = $$props.showResidualsTable);
    		if ('showPredictTooltip' in $$props) $$invalidate(20, showPredictTooltip = $$props.showPredictTooltip);
    		if ('showResidualControls' in $$props) $$invalidate(21, showResidualControls = $$props.showResidualControls);
    		if ('showRegressionLineControls' in $$props) $$invalidate(22, showRegressionLineControls = $$props.showRegressionLineControls);
    		if ('showUserLineControls' in $$props) $$invalidate(23, showUserLineControls = $$props.showUserLineControls);
    		if ('showPoints' in $$props) $$invalidate(24, showPoints = $$props.showPoints);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[1] & /*$counter*/ 1) {
    			// destructure store application state variables
    			$$invalidate(24, { showPoints, showUserLine, showRegressionLine, showUserLineControls, showRegressionLineControls, showResidualControls, showHighlighting, showSingleResidual, showPredictTooltip, showRegressionResiduals, showUserResiduals, showResidualsTable } = sequence[$counter], showPoints, ($$invalidate(3, showUserLine), $$invalidate(31, $counter)), ($$invalidate(2, showRegressionLine), $$invalidate(31, $counter)), ($$invalidate(23, showUserLineControls), $$invalidate(31, $counter)), ($$invalidate(22, showRegressionLineControls), $$invalidate(31, $counter)), ($$invalidate(21, showResidualControls), $$invalidate(31, $counter)), ($$invalidate(13, showHighlighting), $$invalidate(31, $counter)), ($$invalidate(4, showSingleResidual), $$invalidate(31, $counter)), ($$invalidate(20, showPredictTooltip), $$invalidate(31, $counter)), ($$invalidate(6, showRegressionResiduals), $$invalidate(31, $counter)), ($$invalidate(5, showUserResiduals), $$invalidate(31, $counter)), ($$invalidate(19, showResidualsTable), $$invalidate(31, $counter)));
    		}

    		if ($$self.$$.dirty[0] & /*width*/ 1) {
    			// scales
    			$$invalidate(18, xScale = linear().domain([0, 20]).range([margins.left, width - margins.right]));
    		}

    		if ($$self.$$.dirty[0] & /*height*/ 2) {
    			$$invalidate(17, yScale = linear().domain([0, 15]).range([height - margins.bottom, margins.top]));
    		}

    		if ($$self.$$.dirty[0] & /*width*/ 1) {
    			// ticks
    			$$invalidate(16, xTicks = width > 360 ? [0, 4, 8, 12, 16, 20] : [0, 10, 20]);
    		}

    		if ($$self.$$.dirty[0] & /*height*/ 2) {
    			$$invalidate(15, yTicks = height > 180 ? [0, 3, 6, 9, 12, 15] : [0, 5, 15]);
    		}

    		if ($$self.$$.dirty[0] & /*$userLineStore*/ 128) {
    			// based on the user line, returns a y value for a given x value. Re-runs anytime userLineStore changes
    			$$invalidate(14, userLinePredict = function (x) {
    				return $userLineStore.m * x + $userLineStore.b;
    			});
    		}

    		if ($$self.$$.dirty[0] & /*showRegressionResiduals, showUserResiduals, showSingleResidual, showUserLine, showRegressionLine*/ 124) {
    			{
    				if (showRegressionResiduals === true && showUserResiduals === true) {
    					$$invalidate(9, translating = true);
    				} else {
    					$$invalidate(9, translating = false);
    				}

    				if (showSingleResidual && showUserLine && showRegressionLine) {
    					$$invalidate(10, singleTranslating = true);
    				} else {
    					$$invalidate(10, singleTranslating = false);
    				}
    			}
    		}
    	};

    	return [
    		width,
    		height,
    		showRegressionLine,
    		showUserLine,
    		showSingleResidual,
    		showUserResiduals,
    		showRegressionResiduals,
    		$userLineStore,
    		svg,
    		translating,
    		singleTranslating,
    		highlightId,
    		clickedElement,
    		showHighlighting,
    		userLinePredict,
    		yTicks,
    		xTicks,
    		yScale,
    		xScale,
    		showResidualsTable,
    		showPredictTooltip,
    		showResidualControls,
    		showRegressionLineControls,
    		showUserLineControls,
    		showPoints,
    		$member,
    		$regressionLineStore,
    		margins,
    		resize,
    		highlight,
    		removeHighlights,
    		$counter,
    		control_lineChecked_binding,
    		control_resChecked_binding,
    		control_lineChecked_binding_1,
    		control_resChecked_binding_1,
    		svg_1_binding
    	];
    }

    class Chart extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {}, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chart",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/Header.svelte generated by Svelte v3.42.6 */

    const file$2 = "src/components/Header.svelte";

    function create_fragment$2(ctx) {
    	let header;
    	let nav;
    	let ul;

    	const block = {
    		c: function create() {
    			header = element("header");
    			nav = element("nav");
    			ul = element("ul");
    			add_location(ul, file$2, 6, 8, 48);
    			add_location(nav, file$2, 5, 4, 34);
    			attr_dev(header, "class", "svelte-1nwddp");
    			add_location(header, file$2, 4, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, nav);
    			append_dev(nav, ul);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/ProgressBar.svelte generated by Svelte v3.42.6 */
    const file$1 = "src/components/ProgressBar.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (38:20) {#if i < currentStep }
    function create_if_block(ctx) {
    	let i;
    	let i_transition;
    	let current;

    	const block = {
    		c: function create() {
    			i = element("i");
    			i.textContent = "done";
    			attr_dev(i, "id", /*i*/ ctx[8]);
    			attr_dev(i, "class", "material-icons-round svelte-1fj5sz9");
    			add_location(i, file$1, 38, 24, 991);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!i_transition) i_transition = create_bidirectional_transition(i, scale, {}, true);
    				i_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!i_transition) i_transition = create_bidirectional_transition(i, scale, {}, false);
    			i_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching && i_transition) i_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(38:20) {#if i < currentStep }",
    		ctx
    	});

    	return block;
    }

    // (36:8) {#each steps as step, i}
    function create_each_block(ctx) {
    	let li;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*i*/ ctx[8] < /*currentStep*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (if_block) if_block.c();
    			t = space();
    			attr_dev(li, "id", /*i*/ ctx[8]);
    			set_style(li, "width", circleWidth + "px");
    			attr_dev(li, "class", "svelte-1fj5sz9");
    			toggle_class(li, "completed", /*i*/ ctx[8] < /*currentStep*/ ctx[0]);
    			toggle_class(li, "current", /*i*/ ctx[8] === /*currentStep*/ ctx[0]);
    			add_location(li, file$1, 36, 12, 789);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if (if_block) if_block.m(li, null);
    			append_dev(li, t);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(li, "click", /*setCounter*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*i*/ ctx[8] < /*currentStep*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*currentStep*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(li, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*currentStep*/ 1) {
    				toggle_class(li, "completed", /*i*/ ctx[8] < /*currentStep*/ ctx[0]);
    			}

    			if (dirty & /*currentStep*/ 1) {
    				toggle_class(li, "current", /*i*/ ctx[8] === /*currentStep*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(36:8) {#each steps as step, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let link;
    	let t0;
    	let div;
    	let ol;
    	let progress_1;
    	let t1;
    	let current;
    	let each_value = /*steps*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			div = element("div");
    			ol = element("ol");
    			progress_1 = element("progress");
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(link, "href", "https://fonts.googleapis.com/icon?family=Material+Icons+Round");
    			attr_dev(link, "rel", "stylesheet");
    			add_location(link, file$1, 28, 6, 549);
    			progress_1.value = /*$progress*/ ctx[1];
    			attr_dev(progress_1, "class", "svelte-1fj5sz9");
    			add_location(progress_1, file$1, 34, 8, 704);
    			attr_dev(ol, "class", "svelte-1fj5sz9");
    			add_location(ol, file$1, 33, 4, 691);
    			attr_dev(div, "id", "progressBar");
    			attr_dev(div, "class", "svelte-1fj5sz9");
    			add_location(div, file$1, 32, 0, 664);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, ol);
    			append_dev(ol, progress_1);
    			append_dev(ol, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$progress*/ 2) {
    				prop_dev(progress_1, "value", /*$progress*/ ctx[1]);
    			}

    			if (dirty & /*circleWidth, currentStep, setCounter*/ 17) {
    				each_value = /*steps*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ol, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const circleWidth = 20;

    function instance$1($$self, $$props, $$invalidate) {
    	let $counter;
    	let $progress;
    	validate_store(counter, 'counter');
    	component_subscribe($$self, counter, $$value => $$invalidate(5, $counter = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProgressBar', slots, []);
    	let { currentStep = 0 } = $$props;
    	const steps = sequence;
    	const progress = tweened(0, { duration: 400, easing: cubicOut });
    	validate_store(progress, 'progress');
    	component_subscribe($$self, progress, value => $$invalidate(1, $progress = value));

    	const setCounter = event => {
    		set_store_value(counter, $counter = Number(event.target.id), $counter);
    	};

    	const writable_props = ['currentStep'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProgressBar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('currentStep' in $$props) $$invalidate(0, currentStep = $$props.currentStep);
    	};

    	$$self.$capture_state = () => ({
    		tweened,
    		cubicOut,
    		scale,
    		createEventDispatcher,
    		sequence,
    		counter,
    		currentStep,
    		steps,
    		progress,
    		circleWidth,
    		setCounter,
    		$counter,
    		$progress
    	});

    	$$self.$inject_state = $$props => {
    		if ('currentStep' in $$props) $$invalidate(0, currentStep = $$props.currentStep);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*currentStep*/ 1) {
    			set_store_value(progress, $progress = currentStep / (steps.length - 1), $progress);
    		}
    	};

    	return [currentStep, $progress, steps, progress, setCounter];
    }

    class ProgressBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { currentStep: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProgressBar",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get currentStep() {
    		throw new Error("<ProgressBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentStep(value) {
    		throw new Error("<ProgressBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.42.6 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let progressbar;
    	let t0;
    	let section;
    	let div2;
    	let div0;
    	let prompt;
    	let t1;
    	let div1;
    	let usernav;
    	let t2;
    	let div3;
    	let chart;
    	let current;

    	progressbar = new ProgressBar({
    			props: { currentStep: /*$counter*/ ctx[0] },
    			$$inline: true
    		});

    	prompt = new Prompt({ $$inline: true });
    	usernav = new UserNav({ $$inline: true });
    	chart = new Chart({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(progressbar.$$.fragment);
    			t0 = space();
    			section = element("section");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(prompt.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(usernav.$$.fragment);
    			t2 = space();
    			div3 = element("div");
    			create_component(chart.$$.fragment);
    			attr_dev(div0, "id", "prompt");
    			attr_dev(div0, "class", "svelte-2mbgmt");
    			add_location(div0, file, 52, 3, 1237);
    			attr_dev(div1, "id", "userNav");
    			attr_dev(div1, "class", "svelte-2mbgmt");
    			add_location(div1, file, 55, 3, 1283);
    			attr_dev(div2, "id", "narrative");
    			attr_dev(div2, "class", "svelte-2mbgmt");
    			add_location(div2, file, 51, 2, 1213);
    			attr_dev(div3, "id", "interactive");
    			attr_dev(div3, "class", "svelte-2mbgmt");
    			add_location(div3, file, 60, 2, 1342);
    			attr_dev(section, "id", "tutorial");
    			attr_dev(section, "class", "svelte-2mbgmt");
    			add_location(section, file, 50, 1, 1187);
    			attr_dev(main, "class", "svelte-2mbgmt");
    			add_location(main, file, 45, 0, 1131);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(progressbar, main, null);
    			append_dev(main, t0);
    			append_dev(main, section);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			mount_component(prompt, div0, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			mount_component(usernav, div1, null);
    			append_dev(section, t2);
    			append_dev(section, div3);
    			mount_component(chart, div3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const progressbar_changes = {};
    			if (dirty & /*$counter*/ 1) progressbar_changes.currentStep = /*$counter*/ ctx[0];
    			progressbar.$set(progressbar_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(progressbar.$$.fragment, local);
    			transition_in(prompt.$$.fragment, local);
    			transition_in(usernav.$$.fragment, local);
    			transition_in(chart.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(progressbar.$$.fragment, local);
    			transition_out(prompt.$$.fragment, local);
    			transition_out(usernav.$$.fragment, local);
    			transition_out(chart.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(progressbar);
    			destroy_component(prompt);
    			destroy_component(usernav);
    			destroy_component(chart);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $counter;
    	validate_store(counter, 'counter');
    	component_subscribe($$self, counter, $$value => $$invalidate(0, $counter = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const colors = {
    		primary: "#560bad",
    		secondary: "#10c2a7",
    		accent: "#ffa600",
    		background: "#f0f3f5",
    		alert: "#fa5639"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		colors,
    		Prompt,
    		UserNav,
    		Chart,
    		Header,
    		Footer: Header,
    		ProgressBar,
    		counter,
    		$counter
    	});

    	return [$counter];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
