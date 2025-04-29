export const API_URL = process.env.REACT_APP_API_URL || 'https://api.mytadating.site/api';

export const AUTH_TOKEN_KEY = "auth_token";
export const DEFAULT_PAGE_SIZE = 10;

export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'https://api.mytadating.site:3001';

export const AGORA_APP_ID = "12934dd56c904bada036f4e00867a7b3";

export const isTelegram = 0;

const config = {
    API_URL: process.env.REACT_APP_API_URL || 'https://api.mytadating.site',
    DEFAULT_USER_ID: '67fba439cf98acec362a6a2f', // Current user's ID
    FALLBACK_AVATAR: '/images/default-avatar.png',
    MESSAGE_STATUS: {
        READ: 'read',
        DELIVERED: 'delivered'
    },
    API: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            REFRESH: '/auth/refresh',
            LOGOUT: '/auth/logout'
        },
        USERS: {
            BASE: '/users',
            PROFILE: '/users/profile',
            BY_ID: (id) => `/users/${id}`,
            MAIN_INFO_UPDATE: '/users/mainInfoUpdate',
            UPDATE_AUDIO: '/users/updateAudio',
            UPDATE_PHOTOS: '/users/updatePhotos',
            UPDATE_INTERESTS: '/users/updateInterests',
            UPDATE_MEET_GOAL: '/users/updateMeetGoal',
            DELETE_PHOTO: '/users/photo'
        },
        MEDIA: {
            BASE: '/media',
            UPLOAD: '/media/upload',
            DELETE: (id) => `/media/${id}`,
            GET: (id) => `/media/${id}`
        },
        CHATS: {
            BASE: '/chats',
            HISTORY: (id) => `/chats/${id}`,
            MESSAGES: (id) => `/chats/${id}/messages`,
            MARK_READ: (id) => `/chats/${id}/read`,
            TYPING: (id) => `/chats/${id}/typing`
        },
        WALLET: {
            BASE: '/wallet',
            BALANCE: '/wallet/balance',
            TRANSACTIONS: '/wallet/transactions',
            DEPOSIT: '/wallet/deposit',
            WITHDRAW: '/wallet/withdraw',
            PURCHASE: '/wallet/purchase'
        },
        MATCHES: {
            BASE: '/matches',
            POTENTIAL: '/matches/potential',
            CREATE: '/matches/create',
            ACCEPT: (id) => `/matches/${id}/accept`,
            REJECT: (id) => `/matches/${id}/reject`,
            LIST: '/matches/list',
            BY_ID: (id) => `/matches/${id}`
        },
        STREAMS: {
            BASE: '/streams',
            CREATE: '/streams/create',
            LIST: '/streams/list',
            BY_ID: (id) => `/streams/${id}`,
            JOIN: (id) => `/streams/${id}/join`,
            LEAVE: (id) => `/streams/${id}/leave`,
            CHAT: (id) => `/streams/${id}/chat`
        },
        MODERATION: {
            BASE: '/moderation',
            REPORTS: '/moderation/reports',
            ACTIONS: '/moderation/actions',
            BAN: (id) => `/moderation/ban/${id}`,
            UNBAN: (id) => `/moderation/unban/${id}`
        }
    },
    ROUTES: {
        HOME: '/',
        MEET: '/meet',
        MENU: '/menu',
        CALCULATE: '/calculatepage',
        MATCH: '/match',
        FILTERS: '/filters',
        STREAMS: {
            LIST: '/streams',
            WATCH: '/streams/:stream_id',
            FILTERS: '/streams/filters',
            STREAMER: '/streamer/:id',
            BROADCASTER: '/broadcaster/:id'
        },
        CHATS: {
            LIST: '/chats',
            TEXT: '/chats/:chat_id',
            VIDEO: '/chats/video/:id'
        },
        PROFILE: {
            VIEW: '/profile/:id',
            EDIT: '/profileedit',
            PHOTO: '/profileedit/photo',
            MAIN: '/profileedit/main',
            MEET_GOAL: '/profileedit/meetGoal',
            AUDIO: '/profileedit/audio',
            INTERESTS: '/profileedit/interests',
            DELETE: '/profileedit/delete',
            CONFIRM_DELETE: '/profileedit/confirmdelete'
        },
        REACTION: '/reaction/:id',
        NOTIFICATIONS: '/notifications',
        PROFILE_MENU: '/profilemenu',
        INVITE: '/invite',
        SUPPORT: '/support',
        MYTA_IDEA: '/mytaidea',
        PAYMENT: '/makepayment',
        PREMIUM: '/premium'
    },
    WS_URL: 'https://api.mytadating.site'
};

export default config; 