export default async function PasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const authorization = `${process.env.NICE_CLIENT_ID}:${process.env.b461e7e27c26903792adf55de51c7b28}`;

    const response: any = await fetch(
      "https://svc.niceapi.co.kr:22001/digital/niceid/oauth/oauth/token",
      {
        method: "POST",
        body: JSON.stringify({
          scope: "default",
          grant_type: "client_credentials",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authorization}`,
        },
      },
    );
    const token = response?.data?.dataBody?.access_token;
  } catch {}

  return (
    <div className="container mx-auto flex max-w-[1150px] gap-6 py-12">
      {children}
    </div>
  );
}
