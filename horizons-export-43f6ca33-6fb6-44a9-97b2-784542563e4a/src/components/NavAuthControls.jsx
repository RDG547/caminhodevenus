import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useNotifications } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Bell, User, LogIn, LogOut, UserPlus, Settings, ShieldCheck, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NavAuthControls = ({ currentNavColors, isMobile = false, setIsOpen }) => {
  const { user, logout, loading } = useAuth();
  const notificationsContext = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (isMobile) setIsOpen(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return "CV";
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const handleNavAndClose = (path) => {
    navigate(path);
    if (isMobile) setIsOpen(false);
  };
  
  if (loading) return <div className="h-10 w-24 animate-pulse bg-muted rounded-md" />;

  if (!notificationsContext) {
    return null;
  }
  
  const { notifications, markAsRead, markAllAsRead, hasUnread, clearNotifications } = notificationsContext;

  if (!user) {
    if (isMobile) return null;
    return (
      <div className="flex items-center space-x-2">
        <Button variant="outline" style={{ borderColor: currentNavColors.primaryColor, color: currentNavColors.primaryColor }} className="hover:opacity-80" asChild>
          <Link to="/login">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Link>
        </Button>
        <Button style={{ background: `linear-gradient(135deg, ${currentNavColors.primaryColor} 0%, ${currentNavColors.accentColor} 100%)`, color: currentNavColors.activeTextColor }} className="hover:opacity-90" asChild>
          <Link to="/register">
           <UserPlus className="mr-2 h-4 w-4" /> Registrar
          </Link>
        </Button>
      </div>
    );
  }
  
  const showNotifications = user?.profile?.notifications_enabled !== false;

  return (
    <>
      {showNotifications && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn("relative h-10 w-10 rounded-full p-0", isMobile && "mr-1")}>
              <Bell className="h-6 w-6" style={{ color: currentNavColors.textColor }} />
              {hasUnread && (
                <span className="absolute top-1 right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{backgroundColor: currentNavColors.accentColor}}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{backgroundColor: currentNavColors.primaryColor}}></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("w-80 md:w-96", isMobile && "mr-2")} align="end" forceMount style={{ backgroundColor: currentNavColors.bgColor, borderColor: currentNavColors.accentColor }}>
            <div className="flex justify-between items-center px-2 py-1.5">
                <DropdownMenuLabel className="font-semibold" style={{color: currentNavColors.textColor}}>Notificações</DropdownMenuLabel>
                {notifications && notifications.length > 0 && (
                    <Button variant="link" size="sm" onClick={() => {clearNotifications(); if(isMobile) setIsOpen(false);}} className="text-xs" style={{color: currentNavColors.accentColor}}>Limpar Todas</Button>
                )}
            </div>
            <DropdownMenuSeparator style={{backgroundColor: currentNavColors.accentColor}}/>
            {notifications && notifications.length === 0 ? (
              <DropdownMenuItem disabled style={{color: currentNavColors.textColor, opacity: 0.7}} className="py-4 text-center justify-center">Nenhuma notificação nova.</DropdownMenuItem>
            ) : (
              <div className={cn("max-h-60 md:max-h-80", "overflow-y-auto")}>
                {notifications && notifications.map(notif => (
                  <DropdownMenuItem key={notif.id} onSelect={() => { markAsRead(notif.id); if(isMobile) setIsOpen(false);}} className={cn("cursor-pointer flex flex-col items-start py-2 px-3 hover:bg-muted/20", !notif.read && "font-semibold bg-muted/10")} style={{color: currentNavColors.textColor}}>
                    <div className="flex justify-between w-full items-center">
                        <span className="text-sm">{notif.title}</span>
                        {!notif.read && <span className="h-2 w-2 rounded-full" style={{backgroundColor: currentNavColors.primaryColor}}></span>}
                    </div>
                    <span className="text-xs opacity-80">{notif.message}</span>
                    <span className="text-xs opacity-60 mt-1">{formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true, locale: ptBR })}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
              {notifications && notifications.length > 0 && hasUnread && (
                    <DropdownMenuItem onSelect={() => {markAllAsRead(); if(isMobile) setIsOpen(false);}} className="text-center mt-1 text-sm py-2" style={{color: currentNavColors.accentColor, justifyContent: 'center', borderTop: `1px solid ${currentNavColors.accentColor}`}}>
                    Marcar todas como lidas
                  </DropdownMenuItem>
                )}
          </DropdownMenuContent>
      </DropdownMenu>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn("relative h-10 w-10 rounded-full", isMobile && "mr-2")}>
            <Avatar className="h-10 w-10 border-2" style={{ borderColor: currentNavColors.primaryColor }}>
                <AvatarImage src={user?.profile?.avatar_url || `https://avatar.vercel.sh/${user.email}.png`} alt={user?.profile?.name || user.email} />
                <AvatarFallback style={{ backgroundColor: currentNavColors.accentColor, color: currentNavColors.activeTextColor }}>{getInitials(user?.profile?.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount style={{ backgroundColor: currentNavColors.bgColor, borderColor: currentNavColors.accentColor }}>
            <DropdownMenuLabel className="font-normal py-3 px-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border-2" style={{ borderColor: currentNavColors.primaryColor }}>
                    <AvatarImage src={user?.profile?.avatar_url || `https://avatar.vercel.sh/${user.email}.png`} alt={user?.profile?.name || user.email} />
                    <AvatarFallback style={{ backgroundColor: currentNavColors.accentColor, color: currentNavColors.activeTextColor }}>{getInitials(user?.profile?.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                    <p className="text-md font-semibold leading-none" style={{ color: currentNavColors.textColor }}>{user?.profile?.name || "Usuário"}</p>
                    <p className="text-xs leading-none" style={{ color: currentNavColors.textColor, opacity: 0.7 }}>
                    {user.email}
                    </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator style={{ backgroundColor: currentNavColors.accentColor }} />
            <DropdownMenuGroup>
                <DropdownMenuItem style={{ color: currentNavColors.textColor }} className="focus:bg-[hsla(var(--primary-foreground)/0.1)] focus:text-[var(--foreground)] py-2.5 px-3" onSelect={() => handleNavAndClose('/perfil')}>
                <User className="mr-3 h-5 w-5" />
                <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger style={{ color: currentNavColors.textColor }} className="focus:bg-[hsla(var(--primary-foreground)/0.1)] focus:text-[var(--foreground)] py-2.5 px-3">
                        <Settings className="mr-3 h-5 w-5" />
                        <span>Configurações</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent style={{ backgroundColor: currentNavColors.bgColor, borderColor: currentNavColors.accentColor }} className="w-52">
                            <DropdownMenuItem style={{ color: currentNavColors.textColor }} className="focus:bg-[hsla(var(--primary-foreground)/0.1)] focus:text-[var(--foreground)] py-2 px-3" onSelect={() => handleNavAndClose('/perfil#preferences')}>
                                <Palette className="mr-2 h-4 w-4" />
                                <span>Preferências</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem style={{ color: currentNavColors.textColor }} className="focus:bg-[hsla(var(--primary-foreground)/0.1)] focus:text-[var(--foreground)] py-2 px-3" onSelect={() => handleNavAndClose('/perfil#security')}>
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                <span>Segurança</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator style={{ backgroundColor: currentNavColors.accentColor }}/>
            <DropdownMenuItem className="focus:bg-destructive/10 focus:text-destructive text-destructive py-2.5 px-3" onSelect={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavAuthControls;