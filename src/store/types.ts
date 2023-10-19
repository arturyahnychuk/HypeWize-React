export interface ProjectType {
    user: string;
    agentName?: string;
    createdAt: string;
    description?: string;
    domain?: string;
    links?: string[];
    name?: string;
    id: string;
    welcomeMessage: string;
    formFields: string[];
    subscription?: string;
    themeColor: string;
}

export interface MessageType {
    _id?: string;
    project: string;
    user: string;
    session: string;
    question: string;
    answer: string;
    userAgent: string;
    ipAddress: string;
    createdAt: string;
    updatedAt: string;
}

export interface ContentType {
    project: string;
    url?: string;
    name?: string;
    content: string;
    contentType: string;
    documentId?: string;
    user: string;
    _id: string;
}

export interface ContentSearchParamsType {
    project: number;
    search?: string;
    contentType?: string;
    page: number;
    limit: number;
    sortBy: string;
}

export interface DisplayMessageType {
    ip: string,
    project: string,
    session: string,
    detail: string,
    tags: string[],
    date: string,
}

export interface ProfileInfoType {
    subscription?: {
        stripe_productId: string;
        stripe_customerId: string;
        stripe_priceId: string;
        stripe_subscriptionId: string;
        start_date: string;
        end_date: string;
    },
    hubspot: {
        activated: boolean;
    }
    google: {
        activated: boolean;
    }
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    isEnterpriseCustomer: boolean;
    createdAt: boolean;
    id: string;
    hideStarterGuide?: boolean;
}

export interface TagType {
    project: string;
    user: string;
    name: string;
    id: string;
    createdAt: string;
}

export interface ExtendDataType {
    session: string;
    userAgent: string;
    ipAddress: string;
}

export interface AlertType {
    type: "success" | "failure" | "";
    title: string;
    content: string;
}

export interface BillingType {
    currentPlan: string;
    features: {
        wordLimit: number;
        projectLimit: number;
        questionLimit: number;
        activeChatbots: string;
        documentPageLimit: number;
    };
    managePlanUrl: string;
}

export interface UsageType {
    messages: {
        currentMonth?: number;
        all: number;
    },
    projects: {
        currentMonth?: number;
        all: number;
    }
    documentPages?: {
        currentMonth?: number;
        all: number;
    }
}

export interface EditModalPropsType {
    title: string;
    type: "text" | "textarea";
    content: string;
}

export interface DeleteModalPropsType {
    content: string;
}

export interface FaqType {
    question: string;
    answer: string;
}

export interface StarterGuideType {
    email: boolean;
    project: boolean;
    content: boolean;
    message: boolean;
    forms: boolean;
    hubspot: boolean;
    hideStarterGuide: boolean;
}

export interface APIType {
    name: string;
    key: string;
    id: string;
    createdAt: string;
}