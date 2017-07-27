/********************************************************************************
** Form generated from reading UI file 'mainform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINFORM_H
#define UI_MAINFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDateEdit>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QGroupBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QRadioButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QTableView>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainForm
{
public:
    QVBoxLayout *verticalLayout_4;
    QStackedWidget *mainStack;
    QWidget *loginPage;
    QGridLayout *gridLayout_16;
    QWidget *loginWidget;
    QGridLayout *gridLayout_24;
    QWidget *loginNumPad;
    QGridLayout *gridLayout_17;
    QPushButton *Login8;
    QPushButton *Login2;
    QPushButton *Login4;
    QPushButton *Login7;
    QPushButton *Login6;
    QPushButton *Login5;
    QPushButton *Login1;
    QPushButton *Login9;
    QPushButton *Login0;
    QPushButton *LoginBack;
    QPushButton *Login3;
    QPushButton *LoginGo;
    QPushButton *basicPageConnect;
    QLabel *connectionlabel;
    QHBoxLayout *horizontalLayout_13;
    QLineEdit *passEdit;
    QLabel *ConnectionLabel;
    QLabel *passLabel;
    QSpacerItem *verticalSpacer_3;
    QSpacerItem *horizontalSpacer_10;
    QSpacerItem *horizontalSpacer_9;
    QSpacerItem *verticalSpacer_4;
    QSpacerItem *horizontalSpacer_12;
    QSpacerItem *horizontalSpacer_13;
    QWidget *basicPage;
    QGridLayout *gridLayout_2;
    QSpacerItem *horizontalSpacer_3;
    QSpacerItem *verticalSpacer_2;
    QSpacerItem *horizontalSpacer_2;
    QSpacerItem *verticalSpacer;
    QHBoxLayout *horizontalLayout_15;
    QPushButton *basicPageClockIn;
    QPushButton *basicPageClockOut;
    QPushButton *basicPageAdvanced;
    QPushButton *basicPagePower;
    QWidget *advPage;
    QGridLayout *gridLayout_7;
    QTabWidget *MainTabs;
    QWidget *EmployeeTab;
    QGridLayout *gridLayout_4;
    QTableView *EmployeeView;
    QWidget *ProjectTab;
    QGridLayout *gridLayout_5;
    QHBoxLayout *horizontalLayout_11;
    QTableView *ProjectView;
    QTableWidget *ProjectItemWidget;
    QWidget *ItemTab;
    QGridLayout *gridLayout_6;
    QTableView *ItemView;
    QWidget *ShiftTab;
    QGridLayout *gridLayout_3;
    QTableView *ShiftView;
    QTabWidget *HeaderTabs;
    QWidget *EmployeeSettings;
    QHBoxLayout *horizontalLayout_2;
    QGroupBox *groupBox;
    QHBoxLayout *horizontalLayout_5;
    QPushButton *EmployeeAdd;
    QPushButton *EmployeeEdit;
    QPushButton *EmployeeDelete;
    QGroupBox *groupBox_2;
    QGridLayout *gridLayout_8;
    QCheckBox *EmployeeShiftCount;
    QCheckBox *EmployeeAdminStatus;
    QCheckBox *EmployeeActive;
    QCheckBox *EmployeePin;
    QCheckBox *EmployeeCurrent;
    QCheckBox *EmployeeId;
    QCheckBox *EmployeeName;
    QGroupBox *groupBox_3;
    QVBoxLayout *verticalLayout_2;
    QRadioButton *AllRadio;
    QRadioButton *CurrentRadio;
    QRadioButton *PastRadio;
    QSpacerItem *horizontalSpacer_4;
    QWidget *ProjectsSettings;
    QHBoxLayout *horizontalLayout_7;
    QGroupBox *groupBox_6;
    QHBoxLayout *horizontalLayout_9;
    QPushButton *ProjectAdd;
    QPushButton *ProjectArchive;
    QPushButton *ProjectDelete;
    QGroupBox *groupBox_8;
    QGridLayout *gridLayout_9;
    QCheckBox *ProjectDate;
    QCheckBox *ProjectCurrent;
    QCheckBox *ProjectName;
    QCheckBox *ProjectId;
    QGroupBox *groupBox_9;
    QVBoxLayout *verticalLayout_3;
    QRadioButton *ProjectAllRadio;
    QRadioButton *ProjectCurrentRadio;
    QRadioButton *ProjectPastRadio;
    QSpacerItem *horizontalSpacer_6;
    QSpacerItem *horizontalSpacer_11;
    QGroupBox *groupBox_12;
    QGridLayout *gridLayout_11;
    QCheckBox *ProjectItemEstHours;
    QCheckBox *ProjectItemEstHourUnit;
    QCheckBox *ProjectItemActHours;
    QCheckBox *ProjectItemName;
    QCheckBox *ProjectItemId;
    QCheckBox *ProjectItemDimension;
    QCheckBox *ProjectItemQuantity;
    QCheckBox *ProjectItemActHourUnit;
    QCheckBox *ProjectItemDifference;
    QWidget *ItemsSettings;
    QHBoxLayout *horizontalLayout_8;
    QGroupBox *groupBox_7;
    QHBoxLayout *horizontalLayout_10;
    QPushButton *ItemAdd;
    QPushButton *ItemEdit;
    QPushButton *ItemDelete;
    QGroupBox *groupBox_10;
    QGridLayout *gridLayout_10;
    QCheckBox *ItemCategory;
    QCheckBox *ItemDimension;
    QCheckBox *ItemSub;
    QCheckBox *ItemName;
    QCheckBox *ItemId;
    QSpacerItem *horizontalSpacer_7;
    QWidget *ShiftSettings;
    QHBoxLayout *horizontalLayout_3;
    QGroupBox *groupBox_4;
    QHBoxLayout *horizontalLayout_6;
    QPushButton *ShiftAdd;
    QPushButton *ShiftEdit;
    QPushButton *ShiftDelete;
    QGroupBox *groupBox_5;
    QGridLayout *gridLayout;
    QComboBox *ShiftEmployeeCombo;
    QComboBox *ShiftProjectCombo;
    QLabel *label2323;
    QComboBox *ShiftItemCombo;
    QLabel *label_3;
    QLabel *label_2;
    QCheckBox *ShiftEmployeeBox;
    QCheckBox *ShiftProjectBox;
    QCheckBox *ShiftItemBox;
    QGroupBox *groupBox_13;
    QGridLayout *gridLayout_13;
    QDateEdit *ShiftDate1;
    QDateEdit *ShiftDate2;
    QLabel *label_4;
    QLabel *label_5;
    QSpacerItem *horizontalSpacer_5;
    QGroupBox *groupBox_15;
    QGridLayout *gridLayout_15;
    QLabel *ShiftTotalTime;
    QWidget *Settings;
    QHBoxLayout *horizontalLayout_12;
    QGroupBox *groupBox_16;
    QGridLayout *gridLayout_18;
    QPushButton *SettingsMax;
    QPushButton *SettingsFull;
    QGroupBox *SettingsConnectionGroup;
    QGridLayout *gridLayout_19;
    QPushButton *SettingsConnections;
    QGroupBox *groupBox_18;
    QGridLayout *gridLayout_20;
    QPushButton *SettingsExport;
    QGroupBox *groupBox_19;
    QGridLayout *gridLayout_21;
    QPushButton *SettingsPrint;
    QGroupBox *groupBox_20;
    QGridLayout *gridLayout_22;
    QPushButton *SettingsAll;
    QSpacerItem *horizontalSpacer_8;
    QHBoxLayout *horizontalLayout;
    QSpacerItem *horizontalSpacer;
    QPushButton *mainFinish;

    void setupUi(QWidget *MainForm)
    {
        if (MainForm->objectName().isEmpty())
            MainForm->setObjectName(QStringLiteral("MainForm"));
        MainForm->resize(1280, 720);
        MainForm->setStyleSheet(QLatin1String("QWidget#MainForm{\n"
"\n"
"background-color:#E8E8E8;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"\n"
"\n"
"}\n"
"\n"
"\n"
"QTabWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"border:none;\n"
"\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"QTabBar{\n"
"background-color:#F1F4F5;\n"
"border:none;\n"
"padding:10px;\n"
"}\n"
"\n"
"QTabBar::tab{\n"
"background-color:#f3f0f2;\n"
"\n"
"\n"
"\n"
"color:black;\n"
"}\n"
"QTabBar::tab:hover{\n"
"\n"
"background-color:#E5E3E4;\n"
"\n"
"}\n"
"\n"
"QTabBar::tab:selected{\n"
"/*\n"
"background-color:#fcfbfb;\n"
"*/\n"
"background-color:#fff;\n"
"}\n"
"\n"
"\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"QWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"\n"
"}\n"
"\n"
"\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"QPushButton#basicPageConnect:hover{\n"
"border-ra"
                        "dius:15px;\n"
"\n"
"}\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#E4E9EB;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"\n"
"}\n"
"\n"
"QDateEdit{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QDateEdit:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"QDateEdit:drop-down{\n"
"border:none;\n"
"}\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:10px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"\n"
""));
        verticalLayout_4 = new QVBoxLayout(MainForm);
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        mainStack = new QStackedWidget(MainForm);
        mainStack->setObjectName(QStringLiteral("mainStack"));
        mainStack->setStyleSheet(QStringLiteral(""));
        loginPage = new QWidget();
        loginPage->setObjectName(QStringLiteral("loginPage"));
        loginPage->setStyleSheet(QLatin1String("\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFF;\n"
"}\n"
"QLineEdit{ \n"
"background-color:#FFF;\n"
" border: 0px solid 263544;	\n"
"font-size: 32px;\n"
"}\n"
"QLineEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid 263544;	\n"
"}\n"
"\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#D1D1D1;\n"
"}\n"
"/*\n"
"\n"
"#E5EAE7\n"
"*/\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 19px;\n"
"color:#263544;\n"
"\n"
"}\n"
"\n"
""));
        gridLayout_16 = new QGridLayout(loginPage);
        gridLayout_16->setObjectName(QStringLiteral("gridLayout_16"));
        loginWidget = new QWidget(loginPage);
        loginWidget->setObjectName(QStringLiteral("loginWidget"));
        gridLayout_24 = new QGridLayout(loginWidget);
        gridLayout_24->setObjectName(QStringLiteral("gridLayout_24"));
        loginNumPad = new QWidget(loginWidget);
        loginNumPad->setObjectName(QStringLiteral("loginNumPad"));
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        loginNumPad->setFont(font);
        loginNumPad->setStyleSheet(QStringLiteral(""));
        gridLayout_17 = new QGridLayout(loginNumPad);
        gridLayout_17->setObjectName(QStringLiteral("gridLayout_17"));
        gridLayout_17->setContentsMargins(0, 0, 0, 0);
        Login8 = new QPushButton(loginNumPad);
        Login8->setObjectName(QStringLiteral("Login8"));
        Login8->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login8, 0, 1, 1, 1);

        Login2 = new QPushButton(loginNumPad);
        Login2->setObjectName(QStringLiteral("Login2"));
        Login2->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login2, 3, 1, 1, 1);

        Login4 = new QPushButton(loginNumPad);
        Login4->setObjectName(QStringLiteral("Login4"));
        Login4->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login4, 1, 0, 1, 1);

        Login7 = new QPushButton(loginNumPad);
        Login7->setObjectName(QStringLiteral("Login7"));
        Login7->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login7, 0, 0, 1, 1);

        Login6 = new QPushButton(loginNumPad);
        Login6->setObjectName(QStringLiteral("Login6"));
        Login6->setMinimumSize(QSize(50, 50));
        Login6->setFont(font);

        gridLayout_17->addWidget(Login6, 1, 2, 1, 1);

        Login5 = new QPushButton(loginNumPad);
        Login5->setObjectName(QStringLiteral("Login5"));
        Login5->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login5, 1, 1, 1, 1);

        Login1 = new QPushButton(loginNumPad);
        Login1->setObjectName(QStringLiteral("Login1"));
        Login1->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login1, 3, 0, 1, 1);

        Login9 = new QPushButton(loginNumPad);
        Login9->setObjectName(QStringLiteral("Login9"));
        Login9->setMinimumSize(QSize(50, 50));
        Login9->setFont(font);

        gridLayout_17->addWidget(Login9, 0, 2, 1, 1);

        Login0 = new QPushButton(loginNumPad);
        Login0->setObjectName(QStringLiteral("Login0"));
        Login0->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(Login0, 4, 0, 1, 1);

        LoginBack = new QPushButton(loginNumPad);
        LoginBack->setObjectName(QStringLiteral("LoginBack"));
        LoginBack->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(LoginBack, 4, 1, 1, 1);

        Login3 = new QPushButton(loginNumPad);
        Login3->setObjectName(QStringLiteral("Login3"));
        Login3->setMinimumSize(QSize(50, 50));
        Login3->setFont(font);

        gridLayout_17->addWidget(Login3, 3, 2, 1, 1);

        LoginGo = new QPushButton(loginNumPad);
        LoginGo->setObjectName(QStringLiteral("LoginGo"));
        LoginGo->setMinimumSize(QSize(50, 50));

        gridLayout_17->addWidget(LoginGo, 4, 2, 1, 1);


        gridLayout_24->addWidget(loginNumPad, 1, 0, 1, 1);

        basicPageConnect = new QPushButton(loginWidget);
        basicPageConnect->setObjectName(QStringLiteral("basicPageConnect"));
        basicPageConnect->setMaximumSize(QSize(256, 16777215));

        gridLayout_24->addWidget(basicPageConnect, 5, 0, 1, 1);

        connectionlabel = new QLabel(loginWidget);
        connectionlabel->setObjectName(QStringLiteral("connectionlabel"));

        gridLayout_24->addWidget(connectionlabel, 2, 0, 1, 1);

        horizontalLayout_13 = new QHBoxLayout();
        horizontalLayout_13->setObjectName(QStringLiteral("horizontalLayout_13"));
        passEdit = new QLineEdit(loginWidget);
        passEdit->setObjectName(QStringLiteral("passEdit"));
        passEdit->setMinimumSize(QSize(0, 45));
        passEdit->setFont(font);
        passEdit->setMaxLength(6);
        passEdit->setEchoMode(QLineEdit::Password);

        horizontalLayout_13->addWidget(passEdit);


        gridLayout_24->addLayout(horizontalLayout_13, 0, 0, 1, 1);

        ConnectionLabel = new QLabel(loginWidget);
        ConnectionLabel->setObjectName(QStringLiteral("ConnectionLabel"));

        gridLayout_24->addWidget(ConnectionLabel, 3, 0, 1, 1);

        passLabel = new QLabel(loginWidget);
        passLabel->setObjectName(QStringLiteral("passLabel"));

        gridLayout_24->addWidget(passLabel, 4, 0, 1, 1);


        gridLayout_16->addWidget(loginWidget, 1, 2, 1, 1);

        verticalSpacer_3 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_16->addItem(verticalSpacer_3, 0, 2, 1, 1);

        horizontalSpacer_10 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_16->addItem(horizontalSpacer_10, 1, 4, 1, 1);

        horizontalSpacer_9 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_16->addItem(horizontalSpacer_9, 1, 0, 1, 1);

        verticalSpacer_4 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_16->addItem(verticalSpacer_4, 6, 2, 1, 1);

        horizontalSpacer_12 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_16->addItem(horizontalSpacer_12, 1, 1, 1, 1);

        horizontalSpacer_13 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_16->addItem(horizontalSpacer_13, 1, 3, 1, 1);

        mainStack->addWidget(loginPage);
        basicPage = new QWidget();
        basicPage->setObjectName(QStringLiteral("basicPage"));
        basicPage->setStyleSheet(QLatin1String("\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#E5EAE7;\n"
"}\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#ECEFED;\n"
"}\n"
""));
        gridLayout_2 = new QGridLayout(basicPage);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        gridLayout_2->setContentsMargins(-1, -1, -1, 0);
        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_2->addItem(horizontalSpacer_3, 1, 3, 1, 1);

        verticalSpacer_2 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_2->addItem(verticalSpacer_2, 2, 1, 1, 1);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_2->addItem(horizontalSpacer_2, 1, 0, 1, 1);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_2->addItem(verticalSpacer, 0, 1, 1, 1);

        horizontalLayout_15 = new QHBoxLayout();
        horizontalLayout_15->setObjectName(QStringLiteral("horizontalLayout_15"));
        basicPageClockIn = new QPushButton(basicPage);
        basicPageClockIn->setObjectName(QStringLiteral("basicPageClockIn"));

        horizontalLayout_15->addWidget(basicPageClockIn);

        basicPageClockOut = new QPushButton(basicPage);
        basicPageClockOut->setObjectName(QStringLiteral("basicPageClockOut"));

        horizontalLayout_15->addWidget(basicPageClockOut);

        basicPageAdvanced = new QPushButton(basicPage);
        basicPageAdvanced->setObjectName(QStringLiteral("basicPageAdvanced"));

        horizontalLayout_15->addWidget(basicPageAdvanced);

        basicPagePower = new QPushButton(basicPage);
        basicPagePower->setObjectName(QStringLiteral("basicPagePower"));

        horizontalLayout_15->addWidget(basicPagePower);


        gridLayout_2->addLayout(horizontalLayout_15, 1, 1, 1, 1);

        mainStack->addWidget(basicPage);
        advPage = new QWidget();
        advPage->setObjectName(QStringLiteral("advPage"));
        gridLayout_7 = new QGridLayout(advPage);
        gridLayout_7->setObjectName(QStringLiteral("gridLayout_7"));
        gridLayout_7->setContentsMargins(0, 0, 0, 0);
        MainTabs = new QTabWidget(advPage);
        MainTabs->setObjectName(QStringLiteral("MainTabs"));
        MainTabs->setTabsClosable(false);
        MainTabs->setTabBarAutoHide(false);
        EmployeeTab = new QWidget();
        EmployeeTab->setObjectName(QStringLiteral("EmployeeTab"));
        gridLayout_4 = new QGridLayout(EmployeeTab);
        gridLayout_4->setSpacing(0);
        gridLayout_4->setObjectName(QStringLiteral("gridLayout_4"));
        gridLayout_4->setContentsMargins(0, 0, 0, 0);
        EmployeeView = new QTableView(EmployeeTab);
        EmployeeView->setObjectName(QStringLiteral("EmployeeView"));
        EmployeeView->setFrameShape(QFrame::NoFrame);
        EmployeeView->setEditTriggers(QAbstractItemView::NoEditTriggers);
        EmployeeView->setDragEnabled(true);
        EmployeeView->setDragDropMode(QAbstractItemView::DragDrop);
        EmployeeView->setDefaultDropAction(Qt::MoveAction);
        EmployeeView->setAlternatingRowColors(true);
        EmployeeView->setSelectionMode(QAbstractItemView::ContiguousSelection);
        EmployeeView->setGridStyle(Qt::SolidLine);

        gridLayout_4->addWidget(EmployeeView, 0, 0, 1, 1);

        MainTabs->addTab(EmployeeTab, QString());
        ProjectTab = new QWidget();
        ProjectTab->setObjectName(QStringLiteral("ProjectTab"));
        gridLayout_5 = new QGridLayout(ProjectTab);
        gridLayout_5->setSpacing(0);
        gridLayout_5->setObjectName(QStringLiteral("gridLayout_5"));
        gridLayout_5->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_11 = new QHBoxLayout();
        horizontalLayout_11->setObjectName(QStringLiteral("horizontalLayout_11"));
        ProjectView = new QTableView(ProjectTab);
        ProjectView->setObjectName(QStringLiteral("ProjectView"));
        ProjectView->setFrameShape(QFrame::NoFrame);
        ProjectView->setEditTriggers(QAbstractItemView::NoEditTriggers);
        ProjectView->setAlternatingRowColors(true);

        horizontalLayout_11->addWidget(ProjectView);

        ProjectItemWidget = new QTableWidget(ProjectTab);
        ProjectItemWidget->setObjectName(QStringLiteral("ProjectItemWidget"));
        ProjectItemWidget->setFrameShape(QFrame::NoFrame);
        ProjectItemWidget->setEditTriggers(QAbstractItemView::NoEditTriggers);
        ProjectItemWidget->setAlternatingRowColors(true);

        horizontalLayout_11->addWidget(ProjectItemWidget);


        gridLayout_5->addLayout(horizontalLayout_11, 0, 0, 1, 1);

        MainTabs->addTab(ProjectTab, QString());
        ItemTab = new QWidget();
        ItemTab->setObjectName(QStringLiteral("ItemTab"));
        gridLayout_6 = new QGridLayout(ItemTab);
        gridLayout_6->setSpacing(0);
        gridLayout_6->setObjectName(QStringLiteral("gridLayout_6"));
        gridLayout_6->setContentsMargins(0, 0, 0, 0);
        ItemView = new QTableView(ItemTab);
        ItemView->setObjectName(QStringLiteral("ItemView"));
        ItemView->setFrameShape(QFrame::NoFrame);
        ItemView->setEditTriggers(QAbstractItemView::NoEditTriggers);
        ItemView->setAlternatingRowColors(true);

        gridLayout_6->addWidget(ItemView, 0, 0, 1, 1);

        MainTabs->addTab(ItemTab, QString());
        ShiftTab = new QWidget();
        ShiftTab->setObjectName(QStringLiteral("ShiftTab"));
        gridLayout_3 = new QGridLayout(ShiftTab);
        gridLayout_3->setSpacing(0);
        gridLayout_3->setObjectName(QStringLiteral("gridLayout_3"));
        gridLayout_3->setSizeConstraint(QLayout::SetMinimumSize);
        gridLayout_3->setContentsMargins(0, 0, 0, 0);
        ShiftView = new QTableView(ShiftTab);
        ShiftView->setObjectName(QStringLiteral("ShiftView"));
        ShiftView->setFrameShape(QFrame::NoFrame);
        ShiftView->setEditTriggers(QAbstractItemView::NoEditTriggers);
        ShiftView->setAlternatingRowColors(true);

        gridLayout_3->addWidget(ShiftView, 0, 0, 1, 1);

        MainTabs->addTab(ShiftTab, QString());

        gridLayout_7->addWidget(MainTabs, 2, 0, 1, 1);

        HeaderTabs = new QTabWidget(advPage);
        HeaderTabs->setObjectName(QStringLiteral("HeaderTabs"));
        HeaderTabs->setMaximumSize(QSize(16777215, 110));
        HeaderTabs->setStyleSheet(QStringLiteral(""));
        HeaderTabs->setTabPosition(QTabWidget::North);
        HeaderTabs->setTabShape(QTabWidget::Rounded);
        HeaderTabs->setElideMode(Qt::ElideLeft);
        HeaderTabs->setDocumentMode(false);
        HeaderTabs->setTabsClosable(false);
        HeaderTabs->setMovable(false);
        HeaderTabs->setTabBarAutoHide(false);
        EmployeeSettings = new QWidget();
        EmployeeSettings->setObjectName(QStringLiteral("EmployeeSettings"));
        EmployeeSettings->setStyleSheet(QLatin1String("QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"QCheckBox::indicator:hover,QRadioButton::indicator:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"\n"
"}\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#FE938C;\n"
"\n"
"}\n"
""));
        horizontalLayout_2 = new QHBoxLayout(EmployeeSettings);
        horizontalLayout_2->setSpacing(1);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalLayout_2->setContentsMargins(2, 2, 2, 2);
        groupBox = new QGroupBox(EmployeeSettings);
        groupBox->setObjectName(QStringLiteral("groupBox"));
        groupBox->setMinimumSize(QSize(0, 0));
        groupBox->setMaximumSize(QSize(200, 16777215));
        groupBox->setStyleSheet(QStringLiteral(""));
        horizontalLayout_5 = new QHBoxLayout(groupBox);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        horizontalLayout_5->setContentsMargins(-1, 7, -1, 7);
        EmployeeAdd = new QPushButton(groupBox);
        EmployeeAdd->setObjectName(QStringLiteral("EmployeeAdd"));

        horizontalLayout_5->addWidget(EmployeeAdd);

        EmployeeEdit = new QPushButton(groupBox);
        EmployeeEdit->setObjectName(QStringLiteral("EmployeeEdit"));

        horizontalLayout_5->addWidget(EmployeeEdit);

        EmployeeDelete = new QPushButton(groupBox);
        EmployeeDelete->setObjectName(QStringLiteral("EmployeeDelete"));

        horizontalLayout_5->addWidget(EmployeeDelete);


        horizontalLayout_2->addWidget(groupBox);

        groupBox_2 = new QGroupBox(EmployeeSettings);
        groupBox_2->setObjectName(QStringLiteral("groupBox_2"));
        gridLayout_8 = new QGridLayout(groupBox_2);
        gridLayout_8->setObjectName(QStringLiteral("gridLayout_8"));
        gridLayout_8->setContentsMargins(-1, 7, -1, 7);
        EmployeeShiftCount = new QCheckBox(groupBox_2);
        EmployeeShiftCount->setObjectName(QStringLiteral("EmployeeShiftCount"));

        gridLayout_8->addWidget(EmployeeShiftCount, 0, 2, 1, 1);

        EmployeeAdminStatus = new QCheckBox(groupBox_2);
        EmployeeAdminStatus->setObjectName(QStringLiteral("EmployeeAdminStatus"));

        gridLayout_8->addWidget(EmployeeAdminStatus, 1, 1, 1, 1);

        EmployeeActive = new QCheckBox(groupBox_2);
        EmployeeActive->setObjectName(QStringLiteral("EmployeeActive"));

        gridLayout_8->addWidget(EmployeeActive, 1, 2, 1, 1);

        EmployeePin = new QCheckBox(groupBox_2);
        EmployeePin->setObjectName(QStringLiteral("EmployeePin"));

        gridLayout_8->addWidget(EmployeePin, 0, 1, 1, 1);

        EmployeeCurrent = new QCheckBox(groupBox_2);
        EmployeeCurrent->setObjectName(QStringLiteral("EmployeeCurrent"));

        gridLayout_8->addWidget(EmployeeCurrent, 0, 3, 1, 1);

        EmployeeId = new QCheckBox(groupBox_2);
        EmployeeId->setObjectName(QStringLiteral("EmployeeId"));

        gridLayout_8->addWidget(EmployeeId, 0, 0, 1, 1);

        EmployeeName = new QCheckBox(groupBox_2);
        EmployeeName->setObjectName(QStringLiteral("EmployeeName"));

        gridLayout_8->addWidget(EmployeeName, 1, 0, 1, 1);


        horizontalLayout_2->addWidget(groupBox_2);

        groupBox_3 = new QGroupBox(EmployeeSettings);
        groupBox_3->setObjectName(QStringLiteral("groupBox_3"));
        groupBox_3->setFlat(false);
        groupBox_3->setCheckable(false);
        verticalLayout_2 = new QVBoxLayout(groupBox_3);
        verticalLayout_2->setSpacing(2);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        verticalLayout_2->setContentsMargins(9, 7, -1, 7);
        AllRadio = new QRadioButton(groupBox_3);
        AllRadio->setObjectName(QStringLiteral("AllRadio"));

        verticalLayout_2->addWidget(AllRadio);

        CurrentRadio = new QRadioButton(groupBox_3);
        CurrentRadio->setObjectName(QStringLiteral("CurrentRadio"));

        verticalLayout_2->addWidget(CurrentRadio);

        PastRadio = new QRadioButton(groupBox_3);
        PastRadio->setObjectName(QStringLiteral("PastRadio"));

        verticalLayout_2->addWidget(PastRadio);


        horizontalLayout_2->addWidget(groupBox_3);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_4);

        HeaderTabs->addTab(EmployeeSettings, QString());
        ProjectsSettings = new QWidget();
        ProjectsSettings->setObjectName(QStringLiteral("ProjectsSettings"));
        ProjectsSettings->setStyleSheet(QLatin1String("QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"QCheckBox::indicator:hover,QRadioButton::indicator:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"\n"
"}\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#B19994;\n"
"\n"
"}\n"
""));
        horizontalLayout_7 = new QHBoxLayout(ProjectsSettings);
        horizontalLayout_7->setSpacing(1);
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        horizontalLayout_7->setContentsMargins(2, 2, 2, 2);
        groupBox_6 = new QGroupBox(ProjectsSettings);
        groupBox_6->setObjectName(QStringLiteral("groupBox_6"));
        horizontalLayout_9 = new QHBoxLayout(groupBox_6);
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        horizontalLayout_9->setContentsMargins(-1, 7, -1, 7);
        ProjectAdd = new QPushButton(groupBox_6);
        ProjectAdd->setObjectName(QStringLiteral("ProjectAdd"));

        horizontalLayout_9->addWidget(ProjectAdd);

        ProjectArchive = new QPushButton(groupBox_6);
        ProjectArchive->setObjectName(QStringLiteral("ProjectArchive"));

        horizontalLayout_9->addWidget(ProjectArchive);

        ProjectDelete = new QPushButton(groupBox_6);
        ProjectDelete->setObjectName(QStringLiteral("ProjectDelete"));

        horizontalLayout_9->addWidget(ProjectDelete);


        horizontalLayout_7->addWidget(groupBox_6);

        groupBox_8 = new QGroupBox(ProjectsSettings);
        groupBox_8->setObjectName(QStringLiteral("groupBox_8"));
        gridLayout_9 = new QGridLayout(groupBox_8);
        gridLayout_9->setObjectName(QStringLiteral("gridLayout_9"));
        gridLayout_9->setContentsMargins(-1, 7, -1, 7);
        ProjectDate = new QCheckBox(groupBox_8);
        ProjectDate->setObjectName(QStringLiteral("ProjectDate"));

        gridLayout_9->addWidget(ProjectDate, 2, 1, 1, 1);

        ProjectCurrent = new QCheckBox(groupBox_8);
        ProjectCurrent->setObjectName(QStringLiteral("ProjectCurrent"));

        gridLayout_9->addWidget(ProjectCurrent, 0, 1, 1, 1);

        ProjectName = new QCheckBox(groupBox_8);
        ProjectName->setObjectName(QStringLiteral("ProjectName"));

        gridLayout_9->addWidget(ProjectName, 2, 0, 1, 1);

        ProjectId = new QCheckBox(groupBox_8);
        ProjectId->setObjectName(QStringLiteral("ProjectId"));

        gridLayout_9->addWidget(ProjectId, 0, 0, 1, 1);


        horizontalLayout_7->addWidget(groupBox_8);

        groupBox_9 = new QGroupBox(ProjectsSettings);
        groupBox_9->setObjectName(QStringLiteral("groupBox_9"));
        groupBox_9->setFont(font);
        verticalLayout_3 = new QVBoxLayout(groupBox_9);
        verticalLayout_3->setSpacing(2);
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        verticalLayout_3->setContentsMargins(-1, 7, -1, 7);
        ProjectAllRadio = new QRadioButton(groupBox_9);
        ProjectAllRadio->setObjectName(QStringLiteral("ProjectAllRadio"));

        verticalLayout_3->addWidget(ProjectAllRadio);

        ProjectCurrentRadio = new QRadioButton(groupBox_9);
        ProjectCurrentRadio->setObjectName(QStringLiteral("ProjectCurrentRadio"));

        verticalLayout_3->addWidget(ProjectCurrentRadio);

        ProjectPastRadio = new QRadioButton(groupBox_9);
        ProjectPastRadio->setObjectName(QStringLiteral("ProjectPastRadio"));

        verticalLayout_3->addWidget(ProjectPastRadio);


        horizontalLayout_7->addWidget(groupBox_9);

        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_6);

        horizontalSpacer_11 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_11);

        groupBox_12 = new QGroupBox(ProjectsSettings);
        groupBox_12->setObjectName(QStringLiteral("groupBox_12"));
        groupBox_12->setStyleSheet(QLatin1String("QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#837F9A;\n"
"\n"
"}\n"
""));
        gridLayout_11 = new QGridLayout(groupBox_12);
        gridLayout_11->setObjectName(QStringLiteral("gridLayout_11"));
        gridLayout_11->setContentsMargins(-1, 7, -1, 7);
        ProjectItemEstHours = new QCheckBox(groupBox_12);
        ProjectItemEstHours->setObjectName(QStringLiteral("ProjectItemEstHours"));

        gridLayout_11->addWidget(ProjectItemEstHours, 0, 2, 1, 1);

        ProjectItemEstHourUnit = new QCheckBox(groupBox_12);
        ProjectItemEstHourUnit->setObjectName(QStringLiteral("ProjectItemEstHourUnit"));

        gridLayout_11->addWidget(ProjectItemEstHourUnit, 1, 2, 1, 1);

        ProjectItemActHours = new QCheckBox(groupBox_12);
        ProjectItemActHours->setObjectName(QStringLiteral("ProjectItemActHours"));

        gridLayout_11->addWidget(ProjectItemActHours, 0, 3, 1, 1);

        ProjectItemName = new QCheckBox(groupBox_12);
        ProjectItemName->setObjectName(QStringLiteral("ProjectItemName"));

        gridLayout_11->addWidget(ProjectItemName, 1, 0, 1, 1);

        ProjectItemId = new QCheckBox(groupBox_12);
        ProjectItemId->setObjectName(QStringLiteral("ProjectItemId"));

        gridLayout_11->addWidget(ProjectItemId, 0, 0, 1, 1);

        ProjectItemDimension = new QCheckBox(groupBox_12);
        ProjectItemDimension->setObjectName(QStringLiteral("ProjectItemDimension"));

        gridLayout_11->addWidget(ProjectItemDimension, 1, 1, 1, 1);

        ProjectItemQuantity = new QCheckBox(groupBox_12);
        ProjectItemQuantity->setObjectName(QStringLiteral("ProjectItemQuantity"));

        gridLayout_11->addWidget(ProjectItemQuantity, 0, 1, 1, 1);

        ProjectItemActHourUnit = new QCheckBox(groupBox_12);
        ProjectItemActHourUnit->setObjectName(QStringLiteral("ProjectItemActHourUnit"));

        gridLayout_11->addWidget(ProjectItemActHourUnit, 1, 3, 1, 1);

        ProjectItemDifference = new QCheckBox(groupBox_12);
        ProjectItemDifference->setObjectName(QStringLiteral("ProjectItemDifference"));

        gridLayout_11->addWidget(ProjectItemDifference, 0, 4, 1, 1);


        horizontalLayout_7->addWidget(groupBox_12);

        HeaderTabs->addTab(ProjectsSettings, QString());
        ItemsSettings = new QWidget();
        ItemsSettings->setObjectName(QStringLiteral("ItemsSettings"));
        ItemsSettings->setStyleSheet(QLatin1String("QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"QCheckBox::indicator:hover,QRadioButton::indicator:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"\n"
"}\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#837F9A;\n"
"\n"
"}"));
        horizontalLayout_8 = new QHBoxLayout(ItemsSettings);
        horizontalLayout_8->setSpacing(1);
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        horizontalLayout_8->setContentsMargins(2, 2, 2, 2);
        groupBox_7 = new QGroupBox(ItemsSettings);
        groupBox_7->setObjectName(QStringLiteral("groupBox_7"));
        horizontalLayout_10 = new QHBoxLayout(groupBox_7);
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        horizontalLayout_10->setContentsMargins(-1, 7, -1, 7);
        ItemAdd = new QPushButton(groupBox_7);
        ItemAdd->setObjectName(QStringLiteral("ItemAdd"));

        horizontalLayout_10->addWidget(ItemAdd);

        ItemEdit = new QPushButton(groupBox_7);
        ItemEdit->setObjectName(QStringLiteral("ItemEdit"));

        horizontalLayout_10->addWidget(ItemEdit);

        ItemDelete = new QPushButton(groupBox_7);
        ItemDelete->setObjectName(QStringLiteral("ItemDelete"));

        horizontalLayout_10->addWidget(ItemDelete);


        horizontalLayout_8->addWidget(groupBox_7);

        groupBox_10 = new QGroupBox(ItemsSettings);
        groupBox_10->setObjectName(QStringLiteral("groupBox_10"));
        gridLayout_10 = new QGridLayout(groupBox_10);
        gridLayout_10->setObjectName(QStringLiteral("gridLayout_10"));
        gridLayout_10->setContentsMargins(-1, 7, -1, 7);
        ItemCategory = new QCheckBox(groupBox_10);
        ItemCategory->setObjectName(QStringLiteral("ItemCategory"));

        gridLayout_10->addWidget(ItemCategory, 0, 1, 1, 1);

        ItemDimension = new QCheckBox(groupBox_10);
        ItemDimension->setObjectName(QStringLiteral("ItemDimension"));

        gridLayout_10->addWidget(ItemDimension, 0, 2, 1, 1);

        ItemSub = new QCheckBox(groupBox_10);
        ItemSub->setObjectName(QStringLiteral("ItemSub"));

        gridLayout_10->addWidget(ItemSub, 1, 1, 1, 1);

        ItemName = new QCheckBox(groupBox_10);
        ItemName->setObjectName(QStringLiteral("ItemName"));

        gridLayout_10->addWidget(ItemName, 1, 0, 1, 1);

        ItemId = new QCheckBox(groupBox_10);
        ItemId->setObjectName(QStringLiteral("ItemId"));

        gridLayout_10->addWidget(ItemId, 0, 0, 1, 1);


        horizontalLayout_8->addWidget(groupBox_10);

        horizontalSpacer_7 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_8->addItem(horizontalSpacer_7);

        HeaderTabs->addTab(ItemsSettings, QString());
        ShiftSettings = new QWidget();
        ShiftSettings->setObjectName(QStringLiteral("ShiftSettings"));
        ShiftSettings->setStyleSheet(QLatin1String("QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"QCheckBox::indicator:hover,QRadioButton::indicator:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"\n"
"}\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#8DAA91;\n"
"\n"
"}"));
        horizontalLayout_3 = new QHBoxLayout(ShiftSettings);
        horizontalLayout_3->setSpacing(1);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        horizontalLayout_3->setContentsMargins(2, 2, 2, 2);
        groupBox_4 = new QGroupBox(ShiftSettings);
        groupBox_4->setObjectName(QStringLiteral("groupBox_4"));
        horizontalLayout_6 = new QHBoxLayout(groupBox_4);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        horizontalLayout_6->setContentsMargins(-1, 7, -1, 7);
        ShiftAdd = new QPushButton(groupBox_4);
        ShiftAdd->setObjectName(QStringLiteral("ShiftAdd"));

        horizontalLayout_6->addWidget(ShiftAdd);

        ShiftEdit = new QPushButton(groupBox_4);
        ShiftEdit->setObjectName(QStringLiteral("ShiftEdit"));

        horizontalLayout_6->addWidget(ShiftEdit);

        ShiftDelete = new QPushButton(groupBox_4);
        ShiftDelete->setObjectName(QStringLiteral("ShiftDelete"));

        horizontalLayout_6->addWidget(ShiftDelete);


        horizontalLayout_3->addWidget(groupBox_4);

        groupBox_5 = new QGroupBox(ShiftSettings);
        groupBox_5->setObjectName(QStringLiteral("groupBox_5"));
        gridLayout = new QGridLayout(groupBox_5);
        gridLayout->setSpacing(2);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        gridLayout->setContentsMargins(-1, 7, -1, 7);
        ShiftEmployeeCombo = new QComboBox(groupBox_5);
        ShiftEmployeeCombo->setObjectName(QStringLiteral("ShiftEmployeeCombo"));
        ShiftEmployeeCombo->setMinimumSize(QSize(400, 0));
        ShiftEmployeeCombo->setMaximumSize(QSize(400, 16777215));
        ShiftEmployeeCombo->setFont(font);
        ShiftEmployeeCombo->setEditable(true);
        ShiftEmployeeCombo->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        gridLayout->addWidget(ShiftEmployeeCombo, 0, 2, 1, 1);

        ShiftProjectCombo = new QComboBox(groupBox_5);
        ShiftProjectCombo->setObjectName(QStringLiteral("ShiftProjectCombo"));
        ShiftProjectCombo->setMinimumSize(QSize(400, 0));
        ShiftProjectCombo->setMaximumSize(QSize(400, 16777215));
        ShiftProjectCombo->setFont(font);
        ShiftProjectCombo->setEditable(true);
        ShiftProjectCombo->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        gridLayout->addWidget(ShiftProjectCombo, 1, 2, 1, 1);

        label2323 = new QLabel(groupBox_5);
        label2323->setObjectName(QStringLiteral("label2323"));

        gridLayout->addWidget(label2323, 0, 0, 1, 1);

        ShiftItemCombo = new QComboBox(groupBox_5);
        ShiftItemCombo->setObjectName(QStringLiteral("ShiftItemCombo"));
        ShiftItemCombo->setMinimumSize(QSize(400, 0));
        ShiftItemCombo->setMaximumSize(QSize(400, 16777215));
        ShiftItemCombo->setFont(font);
        ShiftItemCombo->setEditable(true);
        ShiftItemCombo->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        gridLayout->addWidget(ShiftItemCombo, 2, 2, 1, 1);

        label_3 = new QLabel(groupBox_5);
        label_3->setObjectName(QStringLiteral("label_3"));

        gridLayout->addWidget(label_3, 2, 0, 1, 1);

        label_2 = new QLabel(groupBox_5);
        label_2->setObjectName(QStringLiteral("label_2"));

        gridLayout->addWidget(label_2, 1, 0, 1, 1);

        ShiftEmployeeBox = new QCheckBox(groupBox_5);
        ShiftEmployeeBox->setObjectName(QStringLiteral("ShiftEmployeeBox"));

        gridLayout->addWidget(ShiftEmployeeBox, 0, 1, 1, 1);

        ShiftProjectBox = new QCheckBox(groupBox_5);
        ShiftProjectBox->setObjectName(QStringLiteral("ShiftProjectBox"));

        gridLayout->addWidget(ShiftProjectBox, 1, 1, 1, 1);

        ShiftItemBox = new QCheckBox(groupBox_5);
        ShiftItemBox->setObjectName(QStringLiteral("ShiftItemBox"));

        gridLayout->addWidget(ShiftItemBox, 2, 1, 1, 1);


        horizontalLayout_3->addWidget(groupBox_5);

        groupBox_13 = new QGroupBox(ShiftSettings);
        groupBox_13->setObjectName(QStringLiteral("groupBox_13"));
        gridLayout_13 = new QGridLayout(groupBox_13);
        gridLayout_13->setObjectName(QStringLiteral("gridLayout_13"));
        gridLayout_13->setContentsMargins(-1, 7, -1, 7);
        ShiftDate1 = new QDateEdit(groupBox_13);
        ShiftDate1->setObjectName(QStringLiteral("ShiftDate1"));
        ShiftDate1->setCalendarPopup(true);

        gridLayout_13->addWidget(ShiftDate1, 0, 1, 1, 1);

        ShiftDate2 = new QDateEdit(groupBox_13);
        ShiftDate2->setObjectName(QStringLiteral("ShiftDate2"));
        ShiftDate2->setCalendarPopup(true);

        gridLayout_13->addWidget(ShiftDate2, 1, 1, 1, 1);

        label_4 = new QLabel(groupBox_13);
        label_4->setObjectName(QStringLiteral("label_4"));

        gridLayout_13->addWidget(label_4, 0, 0, 1, 1);

        label_5 = new QLabel(groupBox_13);
        label_5->setObjectName(QStringLiteral("label_5"));

        gridLayout_13->addWidget(label_5, 1, 0, 1, 1);


        horizontalLayout_3->addWidget(groupBox_13);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_3->addItem(horizontalSpacer_5);

        groupBox_15 = new QGroupBox(ShiftSettings);
        groupBox_15->setObjectName(QStringLiteral("groupBox_15"));
        gridLayout_15 = new QGridLayout(groupBox_15);
        gridLayout_15->setObjectName(QStringLiteral("gridLayout_15"));
        ShiftTotalTime = new QLabel(groupBox_15);
        ShiftTotalTime->setObjectName(QStringLiteral("ShiftTotalTime"));
        ShiftTotalTime->setLayoutDirection(Qt::LeftToRight);
        ShiftTotalTime->setAlignment(Qt::AlignCenter);

        gridLayout_15->addWidget(ShiftTotalTime, 0, 0, 1, 1);


        horizontalLayout_3->addWidget(groupBox_15);

        HeaderTabs->addTab(ShiftSettings, QString());
        Settings = new QWidget();
        Settings->setObjectName(QStringLiteral("Settings"));
        Settings->setStyleSheet(QLatin1String("\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"\n"
"}\n"
"QCheckBox::indicator:hover,QRadioButton::indicator:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"\n"
"}"));
        horizontalLayout_12 = new QHBoxLayout(Settings);
        horizontalLayout_12->setSpacing(1);
        horizontalLayout_12->setObjectName(QStringLiteral("horizontalLayout_12"));
        horizontalLayout_12->setContentsMargins(2, 2, 2, 2);
        groupBox_16 = new QGroupBox(Settings);
        groupBox_16->setObjectName(QStringLiteral("groupBox_16"));
        gridLayout_18 = new QGridLayout(groupBox_16);
        gridLayout_18->setObjectName(QStringLiteral("gridLayout_18"));
        SettingsMax = new QPushButton(groupBox_16);
        SettingsMax->setObjectName(QStringLiteral("SettingsMax"));

        gridLayout_18->addWidget(SettingsMax, 0, 0, 1, 1);

        SettingsFull = new QPushButton(groupBox_16);
        SettingsFull->setObjectName(QStringLiteral("SettingsFull"));

        gridLayout_18->addWidget(SettingsFull, 0, 1, 1, 1);


        horizontalLayout_12->addWidget(groupBox_16);

        SettingsConnectionGroup = new QGroupBox(Settings);
        SettingsConnectionGroup->setObjectName(QStringLiteral("SettingsConnectionGroup"));
        gridLayout_19 = new QGridLayout(SettingsConnectionGroup);
        gridLayout_19->setObjectName(QStringLiteral("gridLayout_19"));
        gridLayout_19->setContentsMargins(-1, 7, -1, 7);
        SettingsConnections = new QPushButton(SettingsConnectionGroup);
        SettingsConnections->setObjectName(QStringLiteral("SettingsConnections"));

        gridLayout_19->addWidget(SettingsConnections, 0, 0, 1, 1);


        horizontalLayout_12->addWidget(SettingsConnectionGroup);

        groupBox_18 = new QGroupBox(Settings);
        groupBox_18->setObjectName(QStringLiteral("groupBox_18"));
        gridLayout_20 = new QGridLayout(groupBox_18);
        gridLayout_20->setObjectName(QStringLiteral("gridLayout_20"));
        gridLayout_20->setContentsMargins(-1, 7, -1, 7);
        SettingsExport = new QPushButton(groupBox_18);
        SettingsExport->setObjectName(QStringLiteral("SettingsExport"));

        gridLayout_20->addWidget(SettingsExport, 0, 0, 1, 1);


        horizontalLayout_12->addWidget(groupBox_18);

        groupBox_19 = new QGroupBox(Settings);
        groupBox_19->setObjectName(QStringLiteral("groupBox_19"));
        gridLayout_21 = new QGridLayout(groupBox_19);
        gridLayout_21->setObjectName(QStringLiteral("gridLayout_21"));
        gridLayout_21->setContentsMargins(-1, 7, -1, 7);
        SettingsPrint = new QPushButton(groupBox_19);
        SettingsPrint->setObjectName(QStringLiteral("SettingsPrint"));

        gridLayout_21->addWidget(SettingsPrint, 0, 0, 1, 1);


        horizontalLayout_12->addWidget(groupBox_19);

        groupBox_20 = new QGroupBox(Settings);
        groupBox_20->setObjectName(QStringLiteral("groupBox_20"));
        gridLayout_22 = new QGridLayout(groupBox_20);
        gridLayout_22->setObjectName(QStringLiteral("gridLayout_22"));
        gridLayout_22->setContentsMargins(-1, 7, -1, 7);
        SettingsAll = new QPushButton(groupBox_20);
        SettingsAll->setObjectName(QStringLiteral("SettingsAll"));

        gridLayout_22->addWidget(SettingsAll, 0, 0, 1, 1);


        horizontalLayout_12->addWidget(groupBox_20);

        horizontalSpacer_8 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_12->addItem(horizontalSpacer_8);

        HeaderTabs->addTab(Settings, QString());

        gridLayout_7->addWidget(HeaderTabs, 0, 0, 1, 1);

        mainStack->addWidget(advPage);

        verticalLayout_4->addWidget(mainStack);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(0);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        horizontalLayout->setContentsMargins(-1, -1, 4, 0);
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer);

        mainFinish = new QPushButton(MainForm);
        mainFinish->setObjectName(QStringLiteral("mainFinish"));
        mainFinish->setMinimumSize(QSize(50, 30));

        horizontalLayout->addWidget(mainFinish);


        verticalLayout_4->addLayout(horizontalLayout);

        QWidget::setTabOrder(EmployeePin, EmployeeAdminStatus);
        QWidget::setTabOrder(EmployeeAdminStatus, EmployeeShiftCount);
        QWidget::setTabOrder(EmployeeShiftCount, EmployeeActive);
        QWidget::setTabOrder(EmployeeActive, EmployeeCurrent);
        QWidget::setTabOrder(EmployeeCurrent, PastRadio);
        QWidget::setTabOrder(PastRadio, AllRadio);
        QWidget::setTabOrder(AllRadio, CurrentRadio);
        QWidget::setTabOrder(CurrentRadio, MainTabs);
        QWidget::setTabOrder(MainTabs, EmployeeView);
        QWidget::setTabOrder(EmployeeView, ProjectAdd);
        QWidget::setTabOrder(ProjectAdd, ProjectArchive);
        QWidget::setTabOrder(ProjectArchive, ProjectDelete);
        QWidget::setTabOrder(ProjectDelete, ProjectId);
        QWidget::setTabOrder(ProjectId, ProjectName);
        QWidget::setTabOrder(ProjectName, ProjectCurrent);
        QWidget::setTabOrder(ProjectCurrent, ProjectDate);
        QWidget::setTabOrder(ProjectDate, ProjectAllRadio);
        QWidget::setTabOrder(ProjectAllRadio, ProjectCurrentRadio);
        QWidget::setTabOrder(ProjectCurrentRadio, ProjectPastRadio);
        QWidget::setTabOrder(ProjectPastRadio, EmployeeAdd);
        QWidget::setTabOrder(EmployeeAdd, EmployeeEdit);
        QWidget::setTabOrder(EmployeeEdit, EmployeeDelete);
        QWidget::setTabOrder(EmployeeDelete, EmployeeId);
        QWidget::setTabOrder(EmployeeId, EmployeeName);
        QWidget::setTabOrder(EmployeeName, ProjectItemId);
        QWidget::setTabOrder(ProjectItemId, ProjectItemName);
        QWidget::setTabOrder(ProjectItemName, ProjectView);
        QWidget::setTabOrder(ProjectView, Login3);
        QWidget::setTabOrder(Login3, LoginGo);
        QWidget::setTabOrder(LoginGo, passEdit);
        QWidget::setTabOrder(passEdit, basicPageClockOut);
        QWidget::setTabOrder(basicPageClockOut, basicPageAdvanced);
        QWidget::setTabOrder(basicPageAdvanced, basicPageClockIn);
        QWidget::setTabOrder(basicPageClockIn, ItemView);
        QWidget::setTabOrder(ItemView, Login6);
        QWidget::setTabOrder(Login6, Login7);
        QWidget::setTabOrder(Login7, Login8);
        QWidget::setTabOrder(Login8, Login5);
        QWidget::setTabOrder(Login5, Login2);
        QWidget::setTabOrder(Login2, Login9);
        QWidget::setTabOrder(Login9, ShiftView);
        QWidget::setTabOrder(ShiftView, Login4);
        QWidget::setTabOrder(Login4, Login0);
        QWidget::setTabOrder(Login0, LoginBack);
        QWidget::setTabOrder(LoginBack, Login1);
        QWidget::setTabOrder(Login1, ItemAdd);
        QWidget::setTabOrder(ItemAdd, ItemDelete);
        QWidget::setTabOrder(ItemDelete, ItemCategory);
        QWidget::setTabOrder(ItemCategory, ItemDimension);
        QWidget::setTabOrder(ItemDimension, ItemSub);
        QWidget::setTabOrder(ItemSub, ItemName);
        QWidget::setTabOrder(ItemName, ItemId);
        QWidget::setTabOrder(ItemId, ShiftAdd);
        QWidget::setTabOrder(ShiftAdd, ShiftEdit);
        QWidget::setTabOrder(ShiftEdit, ShiftDelete);
        QWidget::setTabOrder(ShiftDelete, ShiftEmployeeCombo);
        QWidget::setTabOrder(ShiftEmployeeCombo, ShiftProjectCombo);
        QWidget::setTabOrder(ShiftProjectCombo, ShiftItemCombo);
        QWidget::setTabOrder(ShiftItemCombo, ShiftEmployeeBox);
        QWidget::setTabOrder(ShiftEmployeeBox, ShiftProjectBox);
        QWidget::setTabOrder(ShiftProjectBox, ShiftItemBox);
        QWidget::setTabOrder(ShiftItemBox, ShiftDate1);
        QWidget::setTabOrder(ShiftDate1, ShiftDate2);
        QWidget::setTabOrder(ShiftDate2, SettingsMax);
        QWidget::setTabOrder(SettingsMax, SettingsFull);
        QWidget::setTabOrder(SettingsFull, SettingsConnections);
        QWidget::setTabOrder(SettingsConnections, SettingsExport);
        QWidget::setTabOrder(SettingsExport, SettingsPrint);
        QWidget::setTabOrder(SettingsPrint, SettingsAll);
        QWidget::setTabOrder(SettingsAll, mainFinish);

        retranslateUi(MainForm);

        mainStack->setCurrentIndex(2);
        MainTabs->setCurrentIndex(3);
        HeaderTabs->setCurrentIndex(1);
        EmployeeAdd->setDefault(false);


        QMetaObject::connectSlotsByName(MainForm);
    } // setupUi

    void retranslateUi(QWidget *MainForm)
    {
        MainForm->setWindowTitle(QApplication::translate("MainForm", "Time-Track", Q_NULLPTR));
        Login8->setText(QApplication::translate("MainForm", "8", Q_NULLPTR));
        Login2->setText(QApplication::translate("MainForm", "2", Q_NULLPTR));
        Login4->setText(QApplication::translate("MainForm", "4", Q_NULLPTR));
        Login7->setText(QApplication::translate("MainForm", "7", Q_NULLPTR));
        Login6->setText(QApplication::translate("MainForm", "6", Q_NULLPTR));
        Login5->setText(QApplication::translate("MainForm", "5", Q_NULLPTR));
        Login1->setText(QApplication::translate("MainForm", "1", Q_NULLPTR));
        Login9->setText(QApplication::translate("MainForm", "9", Q_NULLPTR));
        Login0->setText(QApplication::translate("MainForm", "0", Q_NULLPTR));
        LoginBack->setText(QApplication::translate("MainForm", "<", Q_NULLPTR));
        Login3->setText(QApplication::translate("MainForm", "3", Q_NULLPTR));
        LoginGo->setText(QApplication::translate("MainForm", "Go", Q_NULLPTR));
        basicPageConnect->setText(QString());
        connectionlabel->setText(QString());
        passEdit->setPlaceholderText(QString());
        ConnectionLabel->setText(QString());
        passLabel->setText(QString());
        basicPageClockIn->setText(QString());
        basicPageClockOut->setText(QString());
        basicPageAdvanced->setText(QString());
        basicPagePower->setText(QString());
        MainTabs->setTabText(MainTabs->indexOf(EmployeeTab), QApplication::translate("MainForm", "Employees", Q_NULLPTR));
        MainTabs->setTabText(MainTabs->indexOf(ProjectTab), QApplication::translate("MainForm", "Projects", Q_NULLPTR));
        MainTabs->setTabText(MainTabs->indexOf(ItemTab), QApplication::translate("MainForm", "Sub-Projects", Q_NULLPTR));
        MainTabs->setTabText(MainTabs->indexOf(ShiftTab), QApplication::translate("MainForm", "Shifts", Q_NULLPTR));
        groupBox->setTitle(QApplication::translate("MainForm", "Options", Q_NULLPTR));
        EmployeeAdd->setText(QString());
        EmployeeEdit->setText(QString());
        EmployeeDelete->setText(QString());
        groupBox_2->setTitle(QApplication::translate("MainForm", "Table", Q_NULLPTR));
        EmployeeShiftCount->setText(QApplication::translate("MainForm", "ShiftCount", Q_NULLPTR));
        EmployeeAdminStatus->setText(QApplication::translate("MainForm", "AdminStatus", Q_NULLPTR));
        EmployeeActive->setText(QApplication::translate("MainForm", "Clocked In", Q_NULLPTR));
        EmployeePin->setText(QApplication::translate("MainForm", "Pin", Q_NULLPTR));
        EmployeeCurrent->setText(QApplication::translate("MainForm", "Employed", Q_NULLPTR));
        EmployeeId->setText(QApplication::translate("MainForm", "Id", Q_NULLPTR));
        EmployeeName->setText(QApplication::translate("MainForm", "Name", Q_NULLPTR));
        groupBox_3->setTitle(QApplication::translate("MainForm", "Show", Q_NULLPTR));
        AllRadio->setText(QApplication::translate("MainForm", "All Employees", Q_NULLPTR));
        CurrentRadio->setText(QApplication::translate("MainForm", "Current Employees", Q_NULLPTR));
        PastRadio->setText(QApplication::translate("MainForm", "Past Employees", Q_NULLPTR));
        HeaderTabs->setTabText(HeaderTabs->indexOf(EmployeeSettings), QApplication::translate("MainForm", "Employee", Q_NULLPTR));
        groupBox_6->setTitle(QApplication::translate("MainForm", "Options", Q_NULLPTR));
        ProjectAdd->setText(QString());
        ProjectArchive->setText(QString());
        ProjectDelete->setText(QString());
        groupBox_8->setTitle(QApplication::translate("MainForm", "Table", Q_NULLPTR));
        ProjectDate->setText(QApplication::translate("MainForm", "Date", Q_NULLPTR));
        ProjectCurrent->setText(QApplication::translate("MainForm", "Current", Q_NULLPTR));
        ProjectName->setText(QApplication::translate("MainForm", "Name", Q_NULLPTR));
        ProjectId->setText(QApplication::translate("MainForm", "Id", Q_NULLPTR));
        groupBox_9->setTitle(QApplication::translate("MainForm", "Show", Q_NULLPTR));
        ProjectAllRadio->setText(QApplication::translate("MainForm", "All Projects", Q_NULLPTR));
        ProjectCurrentRadio->setText(QApplication::translate("MainForm", "Current Projects", Q_NULLPTR));
        ProjectPastRadio->setText(QApplication::translate("MainForm", "Past Projects", Q_NULLPTR));
        groupBox_12->setTitle(QApplication::translate("MainForm", "Table", Q_NULLPTR));
        ProjectItemEstHours->setText(QApplication::translate("MainForm", "Est. Hours", Q_NULLPTR));
        ProjectItemEstHourUnit->setText(QApplication::translate("MainForm", "Est. Hours/Unit", Q_NULLPTR));
        ProjectItemActHours->setText(QApplication::translate("MainForm", "Act. Hours", Q_NULLPTR));
        ProjectItemName->setText(QApplication::translate("MainForm", "Name", Q_NULLPTR));
        ProjectItemId->setText(QApplication::translate("MainForm", "Id", Q_NULLPTR));
        ProjectItemDimension->setText(QApplication::translate("MainForm", "Unit", Q_NULLPTR));
        ProjectItemQuantity->setText(QApplication::translate("MainForm", "Quantity", Q_NULLPTR));
        ProjectItemActHourUnit->setText(QApplication::translate("MainForm", "Actual Hours/Unit", Q_NULLPTR));
        ProjectItemDifference->setText(QApplication::translate("MainForm", "Difference(%)", Q_NULLPTR));
        HeaderTabs->setTabText(HeaderTabs->indexOf(ProjectsSettings), QApplication::translate("MainForm", "Project", Q_NULLPTR));
        groupBox_7->setTitle(QApplication::translate("MainForm", "Options", Q_NULLPTR));
        ItemAdd->setText(QString());
        ItemEdit->setText(QString());
        ItemDelete->setText(QString());
        groupBox_10->setTitle(QApplication::translate("MainForm", "Table", Q_NULLPTR));
        ItemCategory->setText(QApplication::translate("MainForm", "Category", Q_NULLPTR));
        ItemDimension->setText(QApplication::translate("MainForm", "Dimension", Q_NULLPTR));
        ItemSub->setText(QApplication::translate("MainForm", "Sub-Category", Q_NULLPTR));
        ItemName->setText(QApplication::translate("MainForm", "Name", Q_NULLPTR));
        ItemId->setText(QApplication::translate("MainForm", "Id", Q_NULLPTR));
        HeaderTabs->setTabText(HeaderTabs->indexOf(ItemsSettings), QApplication::translate("MainForm", "Task", Q_NULLPTR));
        groupBox_4->setTitle(QApplication::translate("MainForm", "Options", Q_NULLPTR));
        ShiftAdd->setText(QString());
        ShiftEdit->setText(QString());
        ShiftDelete->setText(QString());
        groupBox_5->setTitle(QApplication::translate("MainForm", "Display By", Q_NULLPTR));
        label2323->setText(QApplication::translate("MainForm", "Employee:", Q_NULLPTR));
        label_3->setText(QApplication::translate("MainForm", "Item:", Q_NULLPTR));
        label_2->setText(QApplication::translate("MainForm", "Project:", Q_NULLPTR));
        ShiftEmployeeBox->setText(QString());
        ShiftProjectBox->setText(QString());
        ShiftItemBox->setText(QString());
        groupBox_13->setTitle(QApplication::translate("MainForm", "Time", Q_NULLPTR));
        label_4->setText(QApplication::translate("MainForm", "From:", Q_NULLPTR));
        label_5->setText(QApplication::translate("MainForm", "To:", Q_NULLPTR));
        groupBox_15->setTitle(QString());
        ShiftTotalTime->setText(QApplication::translate("MainForm", "0:00", Q_NULLPTR));
        HeaderTabs->setTabText(HeaderTabs->indexOf(ShiftSettings), QApplication::translate("MainForm", "Shift", Q_NULLPTR));
        groupBox_16->setTitle(QApplication::translate("MainForm", "Display", Q_NULLPTR));
        SettingsMax->setText(QString());
        SettingsFull->setText(QString());
        SettingsConnectionGroup->setTitle(QApplication::translate("MainForm", "Connection", Q_NULLPTR));
        SettingsConnections->setText(QString());
        groupBox_18->setTitle(QApplication::translate("MainForm", "Export", Q_NULLPTR));
        SettingsExport->setText(QString());
        groupBox_19->setTitle(QApplication::translate("MainForm", "Printing", Q_NULLPTR));
        SettingsPrint->setText(QString());
        groupBox_20->setTitle(QApplication::translate("MainForm", "All Settings", Q_NULLPTR));
        SettingsAll->setText(QString());
        HeaderTabs->setTabText(HeaderTabs->indexOf(Settings), QApplication::translate("MainForm", "Settings", Q_NULLPTR));
        mainFinish->setText(QApplication::translate("MainForm", "Finish", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class MainForm: public Ui_MainForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINFORM_H
