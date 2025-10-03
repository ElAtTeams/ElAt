import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  bio?: string;
  interests?: string;
  isOnboardingComplete?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  otpCode?: string;
  otpExpiry?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'phone' | 'address' | 'city' | 'district' | 'bio' | 'interests' | 'isOnboardingComplete' | 'resetToken' | 'resetTokenExpiry' | 'otpCode' | 'otpExpiry'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public address?: string;
  public city?: string;
  public district?: string;
  public bio?: string;
  public interests?: string;
  public isOnboardingComplete?: boolean;
  public resetToken?: string;
  public resetTokenExpiry?: Date;
  public otpCode?: string;
  public otpExpiry?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    interests: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isOnboardingComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    otpCode: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: null,
    },
    otpExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    tableName: 'Users', // Tablonun tam adını belirtelim
  }
);

export default User;
