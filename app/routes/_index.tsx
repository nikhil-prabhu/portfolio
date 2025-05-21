import type {MetaFunction} from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

function Name() {
    return (
        <div>
            <h1 className="uppercase font-bold">Name</h1>
            <h2 className="ml-16">Nikhil Prabhu - Systems Engineer</h2>
        </div>
    );
}

function Description() {
    return (
        <div>
            <h1 className="uppercase font-bold">Description</h1>
            <div className="flex flex-col gap-4">
                <p className="ml-16">
                    I am a Systems Engineer with 6 years of professional experience building optimized and efficient
                    software solutions. I have a strong background in cloud technologies such as AWS, Azure, and GCP.
                </p>

                <p className="ml-16">
                    My proficiency in Go, Python, Rust, and C helps me deliver high-quality code that meets the needs of
                    businesses and users alike. I am particularly passionate about building automation scripts that
                    streamline development workflows and improve productivity.
                </p>

                <p className="ml-16">
                    As a FOSS advocate, I actively contribute to open-source projects. If you&apos;d like to collaborate
                    or
                    chat
                    about all things DevOps and FOSS, feel free to connect and follow me on GitHub!
                </p>
            </div>
        </div>
    );
}

function Experience() {
    return (
        <div>
            <h1 className="uppercase font-bold">Experience</h1>
            <div className="flex flex-col gap-4">
                <p className="ml-16">
                    <span className="font-bold">Systems Engineer</span> -at [EGYM AG] -in
                    [Berlin, Germany 🇩🇪] -from [Jun 2025] -to [Present]
                </p>
                <div className="flex flex-col ml-32 gap-4">
                    {/* TODO */}
                </div>

                <p className="ml-16">
                    <span className="font-bold">Developer Associate</span> -at [SAP Labs] -in
                    [Bangalore, India 🇮🇳] -from [Apr 2022] -to [May 2025]
                </p>
                <div className="flex flex-col ml-32 gap-4">
                    <p>
                        Designed and implemented cloud infrastructure monitoring agents and automation solutions.
                    </p>

                    <p>
                        Developed standard libraries of reusable utilities and APIs to minimize technical debt across
                        multiple products and cloud platforms (Python/Go).
                    </p>

                    <p>
                        Developed a custom validation framework in Python to validate infrastructure health and state
                        using YAML files.
                    </p>

                    <p>
                        Conducted code reviews and assessed peer deliverables to ensure alignment with quality standards
                        and best practices.
                    </p>

                    <p>
                        Facilitated the transition of the team&apos;s products and technology stack from Python to Go.
                    </p>

                    <p>
                        Led annual training sessions and provided mentorship to junior engineers to enhance their
                        technical skills and professional growth.
                    </p>
                </div>

                <p className="ml-16">
                    <span className="font-bold">DevOps Engineer</span> -at [SAP Labs] -in
                    [Bangalore, India 🇮🇳] -from [Jun 2020] -to [May 2025]
                </p>
                <div className="flex flex-col ml-32 gap-4">
                    <p>
                        Designed and implemented cloud infrastructure monitoring agents and automation solutions.
                    </p>

                    <p>
                        Developed standard libraries of reusable utilities and APIs to minimize technical debt across
                        multiple products and cloud platforms (Python/Go).
                    </p>

                    <p>
                        Developed a custom validation framework in Python to validate infrastructure health and state
                        using YAML files.
                    </p>

                    <p>
                        Conducted code reviews and assessed peer deliverables to ensure alignment with quality standards
                        and best practices.
                    </p>

                    <p>
                        Facilitated the transition of the team&apos;s products and technology stack from Python to Go.
                    </p>

                    <p>
                        Led annual training sessions and provided mentorship to junior engineers to enhance their
                        technical skills and professional growth.
                    </p>
                </div>

                <p className="ml-16">
                    <span className="font-bold">Full Stack Developer</span> -at [SAP Labs] -in
                    [Bangalore, India 🇮🇳] -from [Aug 2019] -to [May 2020]
                </p>
                <div className="flex flex-col ml-32 gap-4">
                    <p>
                        Developed automated network access control policy modification and monitoring with Python
                        scripts.
                    </p>

                    <p>
                        Automated the onboarding of new users with robotic process automation.
                    </p>

                    <p>
                        Authored technical documentation and internal blogs to showcase developed products and tools,
                        ensuring knowledge sharing and usability.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Education() {
    return (
        <div>
            <h1 className="uppercase font-bold">Education</h1>
            <div className="flex flex-col gap-4">
                <p className="ml-16">
                    <span className="font-bold">Master of Technology</span> -at [Birla Institute of Technology and
                    Science, Pilani] -in
                    [Pilani, India 🇮🇳] -from [Aug 2019] -to [Jun 2023]
                </p>
                <div className="flex flex-col ml-32 gap-4">
                    Grade: 7.46/10, First Class
                </div>

                <p className="ml-16">
                    <span className="font-bold">Bachelor of Computer Applications</span> -at [Bharatiar University] -in
                    [Coimbatore, India 🇮🇳] -from [Aug 2015] -to [May 2019]
                </p>
                <div className="flex flex-col ml-32 gap-4">
                    Grade: 8/10, First Class with Distinction
                </div>
            </div>
        </div>
    );
}

export default function Index() {
    return (
        <div className="flex flex-col gap-4">
            <Name/>
            <Description/>
            <Experience/>
            <Education/>
        </div>
    );
}
