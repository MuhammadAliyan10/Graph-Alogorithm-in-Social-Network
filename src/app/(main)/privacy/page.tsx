import ShinyText from "@/components/Animated/ShinyText";
import { Button } from "@/components/ui/button";
import { FC } from "react";

const PrivacyPolicy: FC = () => {
  return (
    <div className="flex flex-col px-4 my-10 space-y-6">
      <ShinyText
        text=" Privacy Policy"
        className="text-2xl lg:text-5xl font-bold"
        disabled={false}
        speed={2}
      />
      <h4 className="font-bold text-xl">
        Here are some rules and conditions you need to know before giving us you
        data.
      </h4>
      <div className="w-full max-w-4xl italic">
        <ul className="list-disc space-y-3 pl-5 text-md">
          <li className="text-muted-foreground">
            <span className="font-medium">Data Collection:</span> We collect
            personal information, such as your name, email, and usage data, to
            provide and improve our services.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium">Usage of Information:</span> Your data
            is used for enhancing app performance, providing customer support,
            and ensuring secure access to our platform.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium">Device Information:</span> We may
            collect device-specific data, such as IP address, operating system,
            and browser type, to optimize your app experience.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium">Third-Party Services:</span> We may
            share your data with trusted third-party providers for
            authentication, analytics, or additional features.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium">Data Security:</span> We implement
            reasonable measures to safeguard your data but cannot guarantee
            complete security due to internet vulnerabilities.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium">User Rights:</span> You have the right
            to access, update, or delete your personal data. Contact us to
            exercise these rights.
          </li>
          <li className="text-muted-foreground">
            <span className="font-medium">Policy Updates:</span> We may revise
            this Privacy Policy from time to time. Updated policies will be
            posted on this page.
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <Button>Agree</Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
