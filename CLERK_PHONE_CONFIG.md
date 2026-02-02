# 📱 Clerk Phone Number Configuration for Nigeria

## Issue
Users from Nigeria are seeing the error:
> "Phone numbers from this country (Nigeria) are currently not supported. For more information, please contact hoseaephraim50@gmail.com."

## Solution

The phone number restrictions are configured in the **Clerk Dashboard**, not in the code. Follow these steps to enable Nigeria phone numbers:

### Step 1: Access Clerk Dashboard
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign in to your account
3. Select your application

### Step 2: Configure Phone Number Settings
1. Navigate to **Settings** → **Phone numbers** (or **User & Authentication** → **Phone numbers**)
2. Look for **"Allowed countries"** or **"Country restrictions"** section
3. Either:
   - **Option A**: Remove all restrictions (allow all countries)
   - **Option B**: Add Nigeria (+234) to the allowed countries list

### Step 3: Enable Phone Number Authentication
1. In the same settings page, ensure **"Phone number"** is enabled as an authentication method
2. You may need to enable it under **User & Authentication** → **Sign-in options**

### Step 4: Save Changes
1. Click **"Save"** or **"Apply"** to save your changes
2. Changes take effect immediately

## Code Changes Made

The code has been updated to:
- Remove any country restrictions in the `SignUp` component
- Set `allowedCountries={undefined}` to allow all countries

However, **the main configuration must be done in the Clerk Dashboard** as that's where the actual restrictions are enforced.

## Verification

After updating Clerk settings:
1. Try signing up with a Nigerian phone number (+234)
2. The error should no longer appear
3. Users should be able to complete registration

## Additional Notes

- If you're using Clerk's test environment, some features may be limited
- For production, ensure your Clerk plan supports phone number authentication for all countries
- Consider enabling SMS verification for better security

## Support

If you continue to experience issues:
1. Check Clerk's documentation: [https://clerk.com/docs](https://clerk.com/docs)
2. Contact Clerk support through their dashboard
3. Verify your Clerk plan includes phone number authentication



