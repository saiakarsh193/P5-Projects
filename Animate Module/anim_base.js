class AnimBase
{
    constructor(duration, offset=0)
    {
        this.duration = duration;
        this.frame = offset; // to start at a particular frame (relative) of the animation
        this.stat_dict = {};
        this.dyn_dict = {};
    }

    aboveBound()
    {
        return this.frame > this.duration;
    }

    add(key, st_value, en_value=null)
    {
        if(en_value == null)
            this.stat_dict[key] = st_value;
        else
            this.dyn_dict[key] = [st_value, en_value];
    }

    get(key)
    {
        if(key in this.stat_dict)
            return this.stat_dict[key];
        else
            return map(constrain(this.frame, 0, this.duration - 1), 0, this.duration - 1, this.dyn_dict[key][0], this.dyn_dict[key][1]);
    }
}
