declare namespace API {
  type Backup = {
    id?: number;
    title?: string;
    content?: string;
    contentType?: number;
    tags?: string[];
    viewNum?: number;
    thumbNum?: number;
    favourNum?: number;
    priority?: number;
    userId?: number;
    editTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type BackupAddRequest = {
    title?: string;
    content?: string;
    contentType?: number;
    tags?: string[];
  };

  type BackupEditRequest = {
    id?: number;
    title?: string;
    content?: string;
    contentType?: number;
    tags?: string[];
  };

  type BackupQueryRequest = {
    current?: number;
    pageSize?: number;
    ascSortField?: string[];
    descSortField?: string[];
    id?: number;
    notId?: number;
    searchText?: string;
    title?: string;
    content?: string;
    contentType?: number;
    tags?: string[];
    orTags?: string[];
    priority?: number;
    userId?: number;
    favourUserId?: number;
    startTime?: string;
    endTime?: string;
  };

  type BackupUpdateRequest = {
    id?: number;
    title?: string;
    content?: string;
    contentType?: number;
    tags?: string[];
    viewNum?: number;
  };

  type BackupVO = {
    id?: number;
    title?: string;
    content?: string;
    contentType?: number;
    viewNum?: number;
    thumbNum?: number;
    favourNum?: number;
    priority?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    tagList?: string[];
    user?: UserVO;
    hasThumb?: boolean;
    hasFavour?: boolean;
  };

  type BaseResponseBackup = {
    code?: number;
    data?: Backup;
    message?: string;
  };

  type BaseResponseBackupVO = {
    code?: number;
    data?: BackupVO;
    message?: string;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageBackup = {
    code?: number;
    data?: PageBackup;
    message?: string;
  };

  type BaseResponsePageBackupVO = {
    code?: number;
    data?: PageBackupVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserLoginByWxMpGetSceneResponse = {
    code?: number;
    data?: UserLoginByWxMpGetSceneResponse;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getBackupByIdParams = {
    id: number;
  };

  type getBackupVOByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageBackup = {
    records?: Backup[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageBackup;
    searchCount?: PageBackup;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageBackupVO = {
    records?: BackupVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageBackupVO;
    searchCount?: PageBackupVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUser;
    searchCount?: PageUser;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type User = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    unionId?: string;
    mpOpenId?: string;
    wxAppOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    scene?: string;
    vipExpireTime?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserEditRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type userLoginByWxMiniappParams = {
    code: string;
  };

  type UserLoginByWxMpGetSceneResponse = {
    qrCode?: string;
    scene?: string;
  };

  type UserLoginByWxMpRequest = {
    scene?: string;
  };

  type userLoginByWxOpenParams = {
    code: string;
  };

  type UserLoginMockRequest = {
    userId?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    ascSortField?: string[];
    descSortField?: string[];
    id?: number;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    userName?: string;
    phone?: string;
    userAvatar?: string;
  };
}
