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
                    As a FOSS advocate, I actively contribute to open-source projects. If you&#39;d like to collaborate
                    or
                    chat
                    about all things DevOps and FOSS, feel free to connect and follow me on GitHub!
                </p>
            </div>
        </div>
    );
}

export default function Index() {
    return (
        <div className="flex flex-col gap-4">
            <Name/>
            <Description/>
        </div>
    );
}
