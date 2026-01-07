I will intentionally add an error

<codiner-write path="src/pages/Index.tsx" description="intentionally add an error">
// Update this page (the content is just a fallback if you fail to update the page)

import { MadeWithCodiner } from "@/components/made-with-codiner";

const Index = () => {
throw new Error("Line 6 error");
return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="text-center">
<h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
<p className="text-xl text-gray-600">
Start building your amazing project here!
</p>
</div>
<MadeWithCodiner />
</div>
);
};

export default Index;
</codiner-write>
