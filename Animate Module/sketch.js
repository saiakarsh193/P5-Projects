let cx, cy;
let sun_info;
let sun;
let planets_info;
let planets = [];

class Planet
{
    constructor(params)
    {
        this.planet_name = params.planet_name;
        this.planet_description = params.planet_description;
        this.planet_radius = params.planet_radius;
        if('planet_start_angle' in params)
            this.planet_start_angle = params.planet_start_angle;
        else
            this.planet_start_angle = 0;
        this.orbit_present = params.orbit_present;
        if(this.orbit_present)
        {
            this.orbit_radius = params.orbit_radius;
            this.orbit_period = params.orbit_period;
            this.planet = new AnimCircleInf(0, 0, this.orbit_radius, this.orbit_period, this.planet_start_angle);
            this.pangle = map(this.planet.animCircle.get('angle'), 0, 180, 0, Math.PI);
            this.px = this.orbit_radius * Math.cos(this.pangle);
            this.py = this.orbit_radius * Math.sin(this.pangle);
            this.pop_up_dist = 2 * this.planet_radius;
        }
        else
        {
            this.pangle = null;
            this.px = 0;
            this.py = 0;
            this.pop_up_dist = this.planet_radius;
        }
        this.pop_up = null;
    }

    draw()
    {
        // drawing orbit
        if(this.orbit_present)
        {
            noFill();
            stroke(255);
            strokeWeight(2);
            circle(0, 0, 2 * this.orbit_radius);
            fill(0);
            this.planet.draw(2 * this.planet_radius);
            this.pangle = map(this.planet.animCircle.get('angle'), 0, 180, 0, Math.PI);
            this.px = this.orbit_radius * Math.cos(this.pangle);
            this.py = this.orbit_radius * Math.sin(this.pangle);
        }
        else
        {
            stroke(255);
            strokeWeight(2);
            fill(255);
            circle(0, 0, 2 * this.planet_radius);
        }
        // drawing the pop up info box
        let mx = mouseX - cx;
        let my = -(mouseY - cy);
        let dist = Math.sqrt(Math.pow(mx - this.px, 2) + Math.pow(my - this.py, 2));
        if(dist < this.pop_up_dist)
        {
            if(this.pop_up == null)
                this.pop_up = new AnimInfoBox(this.px + this.pop_up_dist, this.py - this.pop_up_dist, 250, 150, 10, this.planet_name, this.planet_description);
            else
            {
                this.pop_up.add('x', this.px + this.pop_up_dist);
                this.pop_up.add('y', this.py - this.pop_up_dist);
            }
            this.pop_up.draw();
        }
        else
            this.pop_up = null;
    }
}

function getOrbitPeriod(radius)
{
    // P^2 = R^3
    // orbit_period^2 = orbit_radius^3
    return Math.sqrt(Math.pow(radius, 3));
}

function setup()
{
    createCanvas(1880, 940);

    cx = width / 2;
    cy = height / 2;

    // sun and planets info source
    // https://www.wesharethesamemoon.org/wp-content/uploads/2019/09/SolarSystemTable.png
    // https://en.wikipedia.org/wiki/Solar_System
    //
    // planet_start_angle is taken uniformly just for visual appeal

    sun_info = 
        {
            planet_name: "Sun",
            planet_description: "The Sun is the Solar System's star and by far its most massive component.",
            planet_diameter: 1391900,
            orbit_present: false
        };

    planets_info = [
        {
            planet_name: "Mercury",
            planet_description: "Mercury is the closest planet to the Sun and the smallest planet in the Solar System.",
            planet_diameter: 4866,
            planet_start_angle: 315,
            orbit_radius: 57950000,
        },
        {
            planet_name: "Venus",
            planet_description: "Venus is close in size to Earth and, like Earth, has a thick silicate mantle around an iron core, a substantial atmosphere, and evidence of internal geological activity.",
            planet_diameter: 12106,
            planet_start_angle: 0,
            orbit_radius: 108110000,
        },
        {
            planet_name: "Earth",
            planet_description: "Earth is the largest and densest of the inner planets, the only one known to have current geological activity, and the only place where life is known to exist.",
            planet_diameter: 12742,
            planet_start_angle: 45,
            orbit_radius: 149570000,
        },
        {
            planet_name: "Mars",
            planet_description: "Mars has an atmosphere of mostly carbon dioxide. Its surface, peppered with volcanoes, such as Olympus Mons, and rift valleys, such as Valles Marineris.",
            planet_diameter: 6760,
            planet_start_angle: 90,
            orbit_radius: 227840000,
        },
        {
            planet_name: "Jupiter",
            planet_description: "Jupiter is composed largely of hydrogen and helium. Jupiter's strong internal heat creates semi-permanent features in its atmosphere, such as cloud bands and the Great Red Spot.",
            planet_diameter: 139516,
            planet_start_angle: 135,
            orbit_radius: 778140000,
        },
        {
            planet_name: "Saturn",
            planet_description: "Saturn is distinguished by its extensive ring system, has several similarities to Jupiter, such as its atmospheric composition and magnetosphere.",
            planet_diameter: 116438,
            planet_start_angle: 180,
            orbit_radius: 1427000000,
        },
        {
            planet_name: "Uranus",
            planet_description: "Uranus has the lowest mass of the outer planets. Uniquely among the planets, it orbits the Sun on its side. Its axial tilt is over ninety degrees to the ecliptic.",
            planet_diameter: 46940,
            planet_start_angle: 225,
            orbit_radius: 2870300000,
        },
        {
            planet_name: "Neptune",
            planet_description: "Neptune though slightly smaller than Uranus, is more massive and hence more dense. It radiates more internal heat than Uranus, but not as much as Jupiter or Saturn.",
            planet_diameter: 45432,
            planet_start_angle: 270,
            orbit_radius: 4499900000,
        },
    ];

    // slightly realisitic
    // let su_di_sc = 1e-5;
    // let pl_di_sc = 3e-4;
    // let pl_or_sc = 3e-7;

    // highly morphed
    let su_di_sc = 5e-5;
    let pl_di_sc = 2e-3;
    let pl_or_sc = 3e-6;

    sun_info.planet_radius = (sun_info.planet_diameter * su_di_sc) / 2;
    sun = new Planet(sun_info);

    planets_info.forEach((planet) => 
        {
            planet.planet_diameter *= pl_di_sc;
            planet.planet_radius = planet.planet_diameter / 2,
                planet.orbit_radius *= pl_or_sc;
            planet.orbit_present = true,
                planet.orbit_period = int(getOrbitPeriod(planet.orbit_radius));
            planets.push(new Planet(planet));
        }
    );
}

function draw()
{
    background(0);
    translate(cx, cy);
    planets.forEach((planet) => planet.draw());
    sun.draw();
}
