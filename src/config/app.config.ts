interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Guest User'],
  customerRoles: [],
  tenantRoles: ['Guest User'],
  tenantName: 'Team',
  applicationName: 'love calculator app',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['View shared results', 'View love calculations', 'View compatibility results', 'View instructions'],
  getQuoteUrl: 'https://app.roq.ai/proposal/052b40b9-d0e7-47a9-b637-2b436f5ad440',
};
