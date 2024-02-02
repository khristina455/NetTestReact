/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsAnalysisRequest {
  admin?: string;
  adminId?: number;
  completeDate?: string;
  creationDate?: string;
  formationDate?: string;
  requestId?: number;
  status?: string;
  user?: string;
  userId?: number;
}

export interface ModelsModeling {
  description?: string;
  image?: string;
  isDeleted?: boolean;
  modelingId?: number;
  name?: string;
  price?: number;
}

export interface ModelsUser {
  isAdmin?: boolean;
  login?: string;
  name?: string;
  password?: string;
  userId?: number;
}

export interface ModelsUserLogin {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

export interface ModelsUserSignUp {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title AnalyzeNetworkApp
 * @version 1.0
 * @baseUrl http://localhost:8080
 * @contact
 *
 * App for analyze networks payload
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Deletes an analysis request for the given user ID
     *
     * @tags AnalysisRequests
     * @name AnalysisRequestsDelete
     * @summary Delete analysis request by user ID
     * @request DELETE:/api/analysis-requests
     */
    analysisRequestsDelete: (params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/analysis-requests`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a list of analysis requests based on the provided parameters
     *
     * @tags AnalysisRequests
     * @name AnalysisRequestsList
     * @summary Get list of analysis requests
     * @request GET:/api/analysis-requests
     */
    analysisRequestsList: (
      query?: {
        /** Analysis request status */
        status?: string;
        /** Start date in the format '2006-01-02T15:04:05Z' */
        start_date?: string;
        /** End date in the format '2006-01-02T15:04:05Z' */
        end_date?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<ModelsAnalysisRequest[], any>({
        path: `/api/analysis-requests`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves an analysis request with the given ID
     *
     * @tags AnalysisRequests
     * @name AnalysisRequestsDetail
     * @summary Get analysis request by ID
     * @request GET:/api/analysis-requests/{id}
     */
    analysisRequestsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/analysis-requests/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of an analysis request with the given ID on "COMPLETE"/"CANCELED"
     *
     * @tags AnalysisRequests
     * @name AnalysisRequestsAdminUpdate
     * @summary Update analysis request status by ID
     * @request PUT:/api/analysis-requests/{requestId}/admin
     */
    analysisRequestsAdminUpdate: (
      requestId: number,
      status: ModelsAnalysisRequest,
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/analysis-requests/${requestId}/admin`,
        method: "PUT",
        body: status,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the status of an analysis request by client on registered
     *
     * @tags AnalysisRequests
     * @name AnalysisRequestsClientUpdate
     * @summary Update analysis request status by client
     * @request PUT:/api/analysis-requests/client
     */
    analysisRequestsClientUpdate: (
      status: ModelsAnalysisRequest,
      params: RequestParams = {}
    ) =>
      this.request<Record<string, string>, any>({
        path: `/api/analysis-requests/client`,
        method: "PUT",
        body: status,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a modeling from a request based on the user ID and modeling ID
     *
     * @tags AnalysisRequests
     * @name AnalysisRequestsModelingsDelete
     * @summary Delete modeling from request
     * @request DELETE:/api/analysis-requests/modelings/{modelingId}
     */
    analysisRequestsModelingsDelete: (
      modelingId: number,
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/analysis-requests/modelings/${modelingId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a request_modeling the given ID
     *
     * @tags RequestsModelings
     * @name AnalysisRequestsModelingsUpdate
     * @summary Update request_modeling by ID
     * @request PUT:/api/analysis-requests/modelings/{modelingId}
     */
    analysisRequestsModelingsUpdate: (
      modelingId: number,
      data: {
        /** nodeQuantity */
        nodeQuantity?: string;
        /** queueSize */
        queueSize?: string;
        /** clientQuantity */
        clientQuantity?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/analysis-requests/modelings/${modelingId}`,
        method: "PUT",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves user information based on the provided user context
     *
     * @tags Authentication
     * @name CheckAuthList
     * @summary Check user authentication
     * @request GET:/api/check-auth
     */
    checkAuthList: (params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/api/check-auth`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Logs out the user by blacklisting the access token
     *
     * @tags Authentication
     * @name LogoutCreate
     * @summary Logout
     * @request POST:/api/logout
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/logout`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Retrieves a list of modelings based on the provided parameters
     *
     * @tags Modelings
     * @name ModelingsList
     * @summary Get list of modelings
     * @request GET:/api/modelings
     */
    modelingsList: (
      query?: {
        /** Query string to filter modelings */
        query?: string;
        /** LowPrice to filter modelings */
        from?: number;
        /** HighPrice string to filter modelings */
        to?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/modelings`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Add a new modeling with image, name, description, and price
     *
     * @tags Modelings
     * @name ModelingsCreate
     * @summary Add new modeling
     * @request POST:/api/modelings
     */
    modelingsCreate: (
      data: {
        /**
         * Modeling image
         * @format binary
         */
        image?: File;
        /** Modeling name */
        name: string;
        /** Modeling description */
        description?: string;
        /** Modeling price */
        price: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<string, Record<string, any>>({
        path: `/api/modelings`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a modeling with the given ID
     *
     * @tags Modelings
     * @name ModelingsDelete
     * @summary Delete modeling by ID
     * @request DELETE:/api/modelings/{id}
     */
    modelingsDelete: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/modelings/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a modeling by its ID
     *
     * @tags Modelings
     * @name ModelingsDetail
     * @summary Get modeling by ID
     * @request GET:/api/modelings/{id}
     */
    modelingsDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsModeling, any>({
        path: `/api/modelings/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a modeling with the given ID
     *
     * @tags Modelings
     * @name ModelingsUpdate
     * @summary Update modeling by ID
     * @request PUT:/api/modelings/{id}
     */
    modelingsUpdate: (
      id: number,
      data: {
        /** name */
        name?: string;
        /** description */
        description?: string;
        /** price */
        price?: string;
        /** image */
        image?: File;
      },
      params: RequestParams = {}
    ) =>
      this.request<Record<string, any>, any>({
        path: `/api/modelings/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds a modeling to analysis request
     *
     * @tags Modelings
     * @name ModelingsRequestCreate
     * @summary Add modeling to request
     * @request POST:/api/modelings/request
     */
    modelingsRequestCreate: (modelingId: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/modelings/request`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        body: { modelingId: modelingId },
        ...params,
      }),

    /**
     * @description Authenticates a user and generates an access token
     *
     * @tags Authentication
     * @name SignInCreate
     * @summary User sign-in
     * @request POST:/api/signIn
     */
    signInCreate: (user: ModelsUserLogin, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/signIn`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new user account
     *
     * @tags Authentication
     * @name SignUpCreate
     * @summary Sign up a new user
     * @request POST:/api/signUp
     */
    signUpCreate: (user: ModelsUserSignUp, params: RequestParams = {}) =>
      this.request<Record<string, any>, any>({
        path: `/api/signUp`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
